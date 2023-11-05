import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import {
  textFieldAddon,
  textFieldAddonSizes,
  textFieldAddonPositions,
  textFieldAddonDivider,
} from "./text-field-addon.css";
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
        textFieldAddon,
        textFieldAddonSizes[props.size],
        textFieldAddonPositions[props.position],
        props.divider ? textFieldAddonDivider[props.position] : null,
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
