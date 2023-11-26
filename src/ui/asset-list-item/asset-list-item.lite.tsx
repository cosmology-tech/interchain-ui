import {
  Show,
  useDefaultProps,
  useMetadata,
  useStore,
  onUpdate,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import type { AssetListItemProps } from "./asset-list-item.types";
import type { BoxProps } from "../box/box.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<AssetListItemProps>>({
  isOtherChains: false,
  needChainSpace: false,
  showDeposit: true,
  showWithdraw: true,
  depositLabel: "Deposit",
  withdrawLabel: "Withdraw",
});

export default function AssetListItem(props: AssetListItemProps) {
  const state = useStore<{
    size: BoxProps["fontSize"];
  }>({
    size: "$xs",
  });

  onUpdate(() => {
    state.size = props.isOtherChains ? "$xs" : "$sm";
  }, [props.isOtherChains]);

  return (
    <Stack
      attributes={{
        minWidth: "720px",
        alignItems: "center",
      }}
      className={props.className}
    >
      <Box width="$19">
        <Box
          as="img"
          attributes={{
            src: props.imgSrc,
          }}
          width={props.isOtherChains ? "$10" : "$14"}
          height={props.isOtherChains ? "$10" : "$14"}
        />
      </Box>
      <Stack attributes={{ alignItems: "center", flex: 1 }}>
        <Stack
          space="$0"
          direction="vertical"
          attributes={{
            width: "25%",
          }}
        >
          <Text
            fontSize={state.size}
            fontWeight="$semibold"
            attributes={{ marginBottom: "$2" }}
          >
            {props.symbol}
          </Text>
          <Text fontSize={state.size} color="$textSecondary">
            {props.name}
          </Text>
        </Stack>
        <Show when={props.needChainSpace}>
          <Stack
            attributes={{
              width: "25%",
            }}
          >
            <Show when={props.isOtherChains}>
              <Text fontSize={state.size} color="$textSecondary">
                {props.chainName}
              </Text>
            </Show>
          </Stack>
        </Show>
        <Stack
          space="$0"
          direction="vertical"
          attributes={{
            width: "25%",
          }}
        >
          <Text
            fontSize={state.size}
            fontWeight="$semibold"
            attributes={{ marginBottom: "$2" }}
          >
            {props.tokenAmount}
          </Text>
          <Text fontSize={state.size} color="$textSecondary">
            {props.tokenAmountPrice}
          </Text>
        </Stack>

        <Show when={!props.needChainSpace}>
          <Stack
            attributes={{
              width: "25%",
            }}
          ></Stack>
        </Show>

        <Stack
          space="$5"
          attributes={{
            width: "25%",
            justifyContent: "flex-end",
          }}
        >
          <Show when={!!props.onDeposit && props.showDeposit}>
            <Button
              intent="text"
              size="sm"
              onClick={(event) => props?.onDeposit?.(event)}
            >
              {props.depositLabel}
            </Button>
          </Show>

          <Show when={!!props.onWithdraw && props.showWithdraw}>
            <Button
              intent="text"
              size="sm"
              onClick={(event) => props?.onWithdraw?.(event)}
            >
              {props.withdrawLabel}
            </Button>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
