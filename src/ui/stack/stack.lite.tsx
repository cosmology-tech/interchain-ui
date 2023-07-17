import { useDefaultProps } from "@builder.io/mitosis";
import clx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { space } from "../../styles/tokens";
import { stackCore, stackDir, gapVar } from "./stack.css";
import Box from "../box";
import { sprinkles as s } from "../../styles/sprinkles.css";
import type { StackProps } from "./stack.types";

export default function Stack(props: StackProps) {
  useDefaultProps({
    direction: "horizontal",
    recursive: false,
    space: "4",
  });

  return (
    <Box as={props.as}>
      <div
        data-stack="stack"
        className={clx(
          props.recursive
            ? props.direction === "vertical"
              ? stackCore.recursiveVertical
              : stackCore.recursiveHoriz
            : props.direction === "vertical"
            ? stackCore.nonRecursiveVertical
            : stackCore.nonRecursiveHoriz,
          stackDir[props.direction],
          props.attributes ? s(props.attributes) : null,
          props.className
        )}
        style={assignInlineVars({
          [gapVar]: props.space in space ? space[props.space] : props.space,
        })}
      >
        {props.children}
      </div>
    </Box>
  );
}
