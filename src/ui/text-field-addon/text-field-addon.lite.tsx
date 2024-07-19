import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import * as styles from "./text-field-addon.css";
import type { TextFieldAddonProps } from "./text-field-addon.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TextFieldAddon(props: TextFieldAddonProps) {
  useDefaultProps({
    divider: false,
    intent: "default",
    disabled: false,
  });

  return (
    <div
      className={clx(
        styles.textFieldAddon,
        styles.textFieldAddonPositions[props.position],
        props.className,
      )}
    >
      <div
        className={clx(
          props.divider ? styles.textFieldAddonDivider[props.position] : null,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
