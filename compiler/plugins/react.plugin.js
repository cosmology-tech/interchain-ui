/**
 * @type {import('@builder.io/mitosis').Plugin}
 */
module.exports = function reactCompilerPlugin() {
  return {
    json: {
      pre: (json) => {
        const comp = {
          ...json,
        };

        const scaffoldMetaData = {
          modal: {
            // {from, to}
            jsxMap: {
              ScaffoldModal: "Modal",
            },
            import: {
              imports: { Modal: "default" },
              path: "../modal",
            },
          },
        };

        const scaffolds = comp.meta.useMetadata?.scaffolds ?? [];

        const changeJsxTag = (component, scaffoldName) => {
          const scaffoldMeta = scaffoldMetaData[scaffoldName];

          // Check if the node has a name property that contains "Scaffold"
          if (component.name && component.name.includes("Scaffold")) {
            // Replace scaffold jsx tag in the name property
            component.name = scaffoldMeta.jsxMap[child.name];
          }

          // Check if the node has a children property
          if (component.children && Array.isArray(component.children)) {
            // Recursively check each child node
            component.children = component.children.map((child) => {
              const isScaffold = child.name.includes("Scaffold");

              if (isScaffold) {
                return {
                  ...child,
                  name: scaffoldMeta.jsxMap[child.name],
                };
              }

              return child;
            });
          }

          return component;
        };

        if (scaffolds.length > 0) {
          // An import will have this shape
          // {
          //   imports: { WalletConnectModalProps: 'WalletConnectModalProps' },
          //   path: './wallet-connect-modal.types'
          // }
          scaffolds.forEach((scaffold) => {
            const scaffoldMeta = scaffoldMetaData[scaffold];

            if (scaffoldMeta) {
              comp.imports.push(scaffoldMeta.import);
            }

            changeJsxTag(comp, scaffold);
            console.log(">>> imports", comp.imports);
          });
        }

        return comp;
      },
    },
    code: {
      // Happens before formatting
      pre: (codeStr) => {
        const result = codeStr
          // Fix generic type for forwardRef not supported yet
          // .replace(/,\s*forwardedRef\s*\)/g, "forwardedRef: any)")
          // fix contenteditable
          .replace(
            /contentEditable\=(.*)/g,
            "contentEditable=$1\nsuppressContentEditableWarning={true}"
          );
        return result;
      },
    },
  };
};
