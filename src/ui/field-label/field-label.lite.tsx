import { Show, useDefaultProps } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Stack from "../stack";
import type { FieldLabelProps } from "./field-label.types";
import { fieldLabelSizes, fieldlabelStyle } from "./field-label.css";

export default function FieldLabel(props: FieldLabelProps) {
  useDefaultProps({
    size: "sm",
  });

  return (
    <Show when={props.label}>
      <Stack space="2" attributes={props.attributes}>
        <Show when={props.label}>
          <Box as="span" display="flex" justifyContent="space-between">
            <Show
              when={props.htmlFor === false}
              else={
                <label id={props.id} htmlFor={props.htmlFor as any}>
                  <span
                    className={clx(
                      fieldlabelStyle,
                      fieldLabelSizes[props.size]
                    )}
                  >
                    {props.label}
                  </span>
                </label>
              }
            >
              <p className={clx(fieldlabelStyle, fieldLabelSizes[props.size])}>
                <span>{props.label}</span>
              </p>
            </Show>
          </Box>
        </Show>
      </Stack>
    </Show>
  );
}
