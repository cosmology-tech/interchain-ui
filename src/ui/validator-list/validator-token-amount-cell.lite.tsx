import { useMetadata, Show, useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import BigNumber from "bignumber.js";
import { formatIntlNumber } from "../../helpers/number";
import type { ValidatorTokenAmountCellProps } from "./validator-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ValidatorTokenAmountCellProps>>({
  size: "md",
});

export default function ValidatorTokenAmountCell(
  props: ValidatorTokenAmountCellProps
) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap="$2"
      {...props.attributes}
      className={props.className}
    >
      <Text fontWeight="$semibold" fontSize="$sm">
        {formatIntlNumber(
          new BigNumber(props.amount).toNumber(),
          null,
          props.formatOptions
        )}
      </Text>

      <Show when={!!props.symbol}>
        <Text fontWeight="$normal" fontSize="$sm" color="$textSecondary">
          {props.symbol}
        </Text>
      </Show>
    </Box>
  );
}
