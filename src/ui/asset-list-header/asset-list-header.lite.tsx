import { For, Show, useDefaultProps } from "@builder.io/mitosis";
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
    <Stack className={styles.assetListHeader} direction="column">
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "10" }}>
        Your assets
      </Text>
      <Show when={!props.isSingle}>
        <Stack className={styles.crossContainer} space="10">
          <For
            each={[
              { text: "Total on Osmosis", value: props.total },
              { text: "Total across all chains", value: props.totalOnAll },
            ]}
          >
            {(item, index: number) => (
              <Stack
                className={styles.card}
                direction="column"
                justify="center"
              >
                <Text color="textSecondary" weight="semibold">
                  {item.text}
                </Text>
                <Stack align="baseline">
                  <Text weight="semibold" attributes={{ marginRight: "1" }}>
                    $
                  </Text>
                  <Text size="4xl" weight="semibold">
                    {item.value}
                  </Text>
                </Stack>
              </Stack>
            )}
          </For>
          <Stack
            direction="column"
            justify="space-between"
            className={styles.crossBtn}
          >
            <Show when={props.canWithdraw}>
              <Button intent="tertiary" onClick={() => console.log("withdraw")}>
                Withdraw
              </Button>
            </Show>
            <Show when={props.canDeposit}>
              <Button
                intent="tertiary"
                variant="outlined"
                onClick={() => console.log("deposit")}
              >
                Deposite
              </Button>
            </Show>
          </Stack>
        </Stack>
      </Show>
      <Show when={props.isSingle}>
        <Stack
          className={styles.singleContainer}
          justify="space-between"
          align="center"
        >
          <Stack direction="column">
            <Text>Total on Osmosis</Text>
            <Stack align="baseline">
              <Text weight="semibold">$</Text>
              <Text size="4xl" weight="semibold">
                {props.total}
              </Text>
            </Stack>
          </Stack>
          <Stack space="12" align="center">
            <Show when={props.canWithdraw}>
              <Button
                intent="tertiary"
                variant="outlined"
                attributes={{ width: "25" }}
                onClick={() => console.log("withdraw")}
              >
                Withdraw
              </Button>
            </Show>
            <Show when={props.canDeposit}>
              <Button
                intent="tertiary"
                attributes={{ width: "25" }}
                onClick={() => console.log("deposit")}
              >
                Deposit
              </Button>
            </Show>
          </Stack>
        </Stack>
      </Show>
    </Stack>
  );
}
