import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import { TokenNumberFieldProps } from "./token-number-field.types";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-field"],
});

export default function TokenNumberField(props: TokenNumberFieldProps) {
  return (
    <Box width="$full" height="$full">
      {/* @ts-expect-error */}
      <ScaffoldNumberField
        id={props?.id}
        value={props.value}
        minValue={0}
        maxValue={isNaN(Number(props.available)) ? 0 : Number(props.available)}
        isDisabled={props.disabled}
        onChange={(value) => props?.onChange?.(value)}
        className={props?.className}
        inputContainer={props?.inputContainer}
        inputClassName={props?.inputClassName}
        borderless={props.borderless}
        decrementButton={props.decrementButton}
        incrementButton={props.incrementButton}
      />
    </Box>
  );
}
