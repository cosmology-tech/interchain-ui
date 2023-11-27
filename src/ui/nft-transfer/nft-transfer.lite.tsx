import { useStore, useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import TextField from "../text-field";
import Button from "../button";
import type { NftTransferProps } from "./nft-transfer.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NftTransferProps>>({
  placeholder: "Enter address",
  transferLabel: "Transfer",
  cancelLabel: "Cancel",
  label: "Recipient",
});

export default function NftTransfer(props: NftTransferProps) {
  const state = useStore<{
    address: string;
  }>({
    address: "",
  });

  return (
    <Box className={props.className}>
      <Text
        fontSize="$lg"
        color="$textSecondary"
        fontWeight="$semibold"
        attributes={{
          marginTop: "$5",
          marginBottom: "$6",
        }}
      >
        {props.label}
      </Text>

      <TextField
        id={props.id}
        placeholder={props.placeholder}
        value={state.address}
        onChange={(e) => {
          state.address = e.target.value;
          props.onChange?.(e.target.value);
        }}
      />

      <Box height="$14" />

      <Button
        fluidWidth
        intent="tertiary"
        size="lg"
        disabled={props.disabled}
        onClick={() => props.onTransfer?.()}
      >
        {props.transferLabel}
      </Button>

      <Button
        fluidWidth
        variant="unstyled"
        size="lg"
        onClick={() => props.onCancel?.()}
      >
        {props.cancelLabel}
      </Button>
    </Box>
  );
}
