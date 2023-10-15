import { Show, useDefaultProps, useStore, onUpdate } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import type { AssetListItemProps } from "./asset-list-item.types";
import type { BoxProps } from "../box/box.types";

export default function AssetListItem(props: AssetListItemProps) {
  useDefaultProps({
    isOtherChains: false,
    needChainSpace: false,
  });

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
            {props.denom}
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
            ${props.tokenAmountPrice}
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
          <Show when={!!props.onDeposit}>
            <Button
              intent="text"
              size="sm"
              onClick={(event) => props?.onDeposit?.(event)}
            >
              Deposit
            </Button>
          </Show>
          <Show when={!!props.onWithdraw}>
            <Button
              intent="text"
              size="sm"
              onClick={(event) => props?.onWithdraw?.(event)}
            >
              Withdraw
            </Button>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
