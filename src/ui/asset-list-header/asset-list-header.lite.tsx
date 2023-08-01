import { For, Show, useDefaultProps, useStore } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import BasicModal from "../basic-modal";
import OverviewTransfer from "../overview-transfer";
import * as styles from "./asset-list-header.css";
import { AssetListHeaderProps } from "./asset-list-header.types";
import { TransferType } from "../overview-transfer/overview-transfer.types";
import { TransferDetail } from "../transfer-item/transfer-item.types";

export default function AssetListHeader(props: AssetListHeaderProps) {
  useDefaultProps({
    isSingle: false,
  });

  const state = useStore<{
    isOpen: boolean;
    transferType: TransferType;
    withdraw: () => void;
    deposit: () => void;
    handleTransfer: (detail: TransferDetail) => void;
  }>({
    isOpen: false,
    transferType: null,
    withdraw() {
      state.transferType = "withdraw";
      state.isOpen = true;
    },
    deposit() {
      state.transferType = "deposit";
      state.isOpen = true;
    },
    handleTransfer(detail: TransferDetail) {
      if (state.transferType === "deposit") {
        props?.onDeposit(detail);
      } else {
        props?.onWithdraw(detail);
      }
    },
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
                <Button intent="tertiary" onClick={() => state.withdraw()}>
                  Withdraw
                </Button>
              </Show>
              <Show when={!!props.onDeposit}>
                <Button intent="tertiary" onClick={() => state.deposit()}>
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
                  onClick={() => state.withdraw()}
                >
                  Withdraw
                </Button>
              </Show>
              <Show when={!!props.onDeposit}>
                <Button
                  intent="tertiary"
                  attributes={{ width: "$25" }}
                  onClick={() => state.deposit()}
                >
                  Deposit
                </Button>
              </Show>
            </Stack>
          </Stack>
        </Show>
      </Stack>
      <BasicModal
        isOpen={state.isOpen}
        title={state.transferType === "deposit" ? "Deposit" : "Withdraw"}
        onClose={() => (state.isOpen = false)}
      >
        <OverviewTransfer
          type={state.transferType}
          dropDownList={props.dropDownList}
          onTransfer={(detail) => state.handleTransfer(detail)}
          onCancel={() => {
            state.isOpen = false;
            if (state.transferType === "deposit") {
              props?.onDepositCancel?.();
            } else {
              props?.onWithdrawCancel?.();
            }
          }}
        />
      </BasicModal>
    </Box>
  );
}
