import { For, Show, useDefaultProps, useStore } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import * as styles from "./asset-list-header.css";
import { AssetListHeaderProps } from "./asset-list-header.types";

export default function AssetListHeader(props: AssetListHeaderProps) {
  useDefaultProps({
    isSingle: false,
  });

  return (
    <Box>
      <Stack className={styles.assetListHeader} direction="vertical">
        <Text
          fontSize="$xl"
          fontWeight="$semibold"
          attributes={{ marginBottom: "$10" }}
        >
          Your assets
        </Text>

        <Show when={!props.isSingle}>
          <Stack className={styles.crossContainer} space="$10">
            <For
              each={[
                { text: "Total on Osmosis", value: props.total },
                { text: "Total across all chains", value: props.totalOnAll },
              ]}
            >
              {(item, index: number) => (
                <Stack
                  className={styles.card}
                  direction="vertical"
                  attributes={{
                    justifyContent: "center",
                  }}
                >
                  <Text color="$textSecondary" fontWeight="$semibold">
                    {item.text}
                  </Text>
                  <Stack
                    attributes={{
                      alignItems: "baseline",
                    }}
                  >
                    <Text
                      fontWeight="$semibold"
                      attributes={{ marginRight: "$1" }}
                    >
                      $
                    </Text>
                    <Text fontSize="$4xl" fontWeight="$semibold">
                      {item.value}
                    </Text>
                  </Stack>
                </Stack>
              )}
            </For>
            <Stack
              direction="vertical"
              attributes={{
                justifyContent: "space-between",
              }}
              className={styles.crossBtn}
            >
              <Show when={!!props.onWithdraw}>
                <Button intent="tertiary" onClick={() => props.onWithdraw?.()}>
                  Withdraw
                </Button>
              </Show>
              <Show when={!!props.onDeposit}>
                <Button intent="tertiary" onClick={() => props.onDeposit?.()}>
                  Deposite
                </Button>
              </Show>
            </Stack>
          </Stack>
        </Show>
        <Show when={props.isSingle}>
          <Stack
            className={styles.singleContainer}
            attributes={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="vertical">
              <Text>Total on Osmosis</Text>
              <Stack
                attributes={{
                  alignItems: "baseline",
                }}
              >
                <Text fontWeight="$semibold">$</Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {props.total}
                </Text>
              </Stack>
            </Stack>
            <Stack
              space="$12"
              attributes={{
                alignItems: "center",
              }}
            >
              <Show when={!!props.onWithdraw}>
                <Button
                  intent="tertiary"
                  attributes={{ width: "$25" }}
                  onClick={() => props.onWithdraw?.()}
                >
                  Withdraw
                </Button>
              </Show>
              <Show when={!!props.onDeposit}>
                <Button
                  intent="tertiary"
                  attributes={{ width: "$25" }}
                  onClick={() => props.onDeposit?.()}
                >
                  Deposit
                </Button>
              </Show>
            </Stack>
          </Stack>
        </Show>
      </Stack>
    </Box>
  );
}
