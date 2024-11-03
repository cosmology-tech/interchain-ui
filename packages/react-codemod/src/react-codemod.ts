import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export function reactCodemod(codeString: string): string {
  const ast = parse(codeString, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  convertDefaultPropsToDestructuringWithDefaults(ast);

  const output = generate(ast, {
    retainLines: true,
    retainFunctionParens: true,
    jsescOption: {
      quotes: "double",
    },
  });

  return output.code;
}

function convertDefaultPropsToDestructuringWithDefaults(ast: t.File) {
  let defaultProps: Record<string, t.Expression> = {};
  let componentName: string | null = null;
  let destructuredProps: Set<string> = new Set();
  let propRenames: Map<string, string> = new Map();

  // First pass: collect defaultProps and remove the assignment
  traverse(ast, {
    AssignmentExpression(path) {
      const { node } = path;
      if (
        t.isMemberExpression(node.left) &&
        t.isIdentifier(node.left.object) &&
        t.isIdentifier(node.left.property) &&
        node.left.property.name === "defaultProps" &&
        t.isObjectExpression(node.right)
      ) {
        componentName = node.left.object.name;

        // Extract defaultProps values
        node.right.properties.forEach((prop) => {
          if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
            defaultProps[prop.key.name] = prop.value as t.Expression;
            destructuredProps.add(prop.key.name);
          }
        });

        // Remove defaultProps assignment
        path.remove();
      }
    },
  });

  // Second pass: add destructuring and replace props.x with x
  if (componentName && Object.keys(defaultProps).length > 0) {
    traverse(ast, {
      FunctionDeclaration(path) {
        const { node } = path;
        if (
          t.isIdentifier(node.id) &&
          node.id.name === componentName &&
          node.params.length > 0
        ) {
          const propsParam = node.params[0];
          if (t.isIdentifier(propsParam)) {
            const propsName = propsParam.name;
            const scope = path.scope;

            // Check for naming conflicts and create renames
            Object.keys(defaultProps).forEach((propName) => {
              if (scope.hasBinding(propName)) {
                const newName = `default${propName.charAt(0).toUpperCase()}${propName.slice(1)}`;
                propRenames.set(propName, newName);
              }
            });

            const properties = Object.entries(defaultProps).map(
              ([key, value]) => {
                const newName = propRenames.get(key) || key;
                return t.objectProperty(
                  t.identifier(key),
                  t.assignmentPattern(t.identifier(newName), value),
                  false,
                  false,
                );
              },
            );

            const destructuringStatement = t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern(properties),
                t.identifier(propsName),
              ),
            ]);

            node.body.body.unshift(destructuringStatement);

            // Replace props.x with x (or renamedX) for destructured props
            traverse(
              node,
              {
                MemberExpression(memberPath) {
                  if (
                    t.isIdentifier(memberPath.node.object) &&
                    memberPath.node.object.name === propsName &&
                    t.isIdentifier(memberPath.node.property) &&
                    destructuredProps.has(memberPath.node.property.name)
                  ) {
                    const propName = memberPath.node.property.name;
                    const newName = propRenames.get(propName) || propName;
                    memberPath.replaceWith(t.identifier(newName));
                  }
                },
              },
              path.scope,
            );
          }
        }
      },
    });
  }
}
