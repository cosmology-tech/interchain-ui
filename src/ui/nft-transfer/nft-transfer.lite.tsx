import { useStore, useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import TextField from "../text-field";
import Button from "../button";

export default function NftTransfer(props) {
  useDefaultProps({
    placeholder: "Enter address",
  });
  const state = useStore<{
    address: string;
  }>({
    address: "",
  });
  return (
    <Box>
      <Text
        fontSize="$lg"
        color="$textSecondary"
        fontWeight="$semibold"
        attributes={{
          marginTop: "$5",
          marginBottom: "$6",
        }}
      >
        Recipient
      </Text>
      <TextField
        id="nft-transfer-address"
        placeholder={props.placeholder}
        value={state.address}
        onChange={(e) => {
          state.address = e.target.value;
          props?.onChange?.(e.target.value);
        }}
      />
      <Box height="$14" />
      <Button
        intent="tertiary"
        size="lg"
        attributes={{ width: "$full" }}
        disabled={props?.disabled}
        onClick={() => props?.onTransfer?.()}
      >
        Transfer
      </Button>
      <Button
        variant="unstyled"
        size="lg"
        attributes={{ width: "$full" }}
        onClick={() => props?.onCancel?.()}
      >
        Cancel
      </Button>
    </Box>
  );
}
