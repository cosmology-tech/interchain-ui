import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import { TokenNumberFieldProps } from "./token-number-field.types";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-input"],
});

export default function TokenNumberField(props: TokenNumberFieldProps) {
  return (
    <Box width="$full" height="$full">
      {/* @ts-expect-error */}
      <ScaffoldNumberInput
        id={props?.id}
        value={props.value}
        min={0}
        max={isNaN(Number(props.available)) ? 0 : Number(props.available)}
        disabled={props.disabled}
        onChange={(e) => props?.onChange?.(e)}
        className={props?.className}
        inputContainer={props?.inputContainer}
        inputClassName={props?.inputClassName}
        borderless={props.borderless}
        startAddon={props.startAddon}
        endAddon={props.endAddon}
      />
    </Box>
  );
}
