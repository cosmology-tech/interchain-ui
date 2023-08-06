import { Show, useDefaultProps, useStore, onUpdate } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import AssetItemTransfer from "../asset-item-transfer";
import BasicModal from "../basic-modal";
import * as styles from "./asset-list-item.css";
import type { AssetListItemProps } from "./asset-list-item.types";
import { AssetItemTransferProps } from "../asset-item-transfer/asset-item-transfer.types";
import type { BoxProps } from "../box/box.types";
import { TransferType } from "../overview-transfer/overview-transfer.types";

export default function AssetListItem(props: AssetListItemProps) {
  useDefaultProps({
    isOtherChains: false,
    needChainSpace: false,
  });

  const state = useStore<{
    size: BoxProps["fontSize"];
    modalDetail: AssetItemTransferProps;
    isOpen: boolean;
    transferType: string;
    handleDposit: () => void;
    handleWithdraw: () => void;
  }>({
    size: "$xs",
    modalDetail: null,
    transferType: "",
    isOpen: false,
    handleDposit: () => {
      void (async function () {
        state.isOpen = true;
        state.transferType = "Deposit";
        state.modalDetail = await props?.onDeposit();
      })();
    },
    handleWithdraw: () => {
      void (async function () {
        state.isOpen = true;
        state.transferType = "Withdraw";
        state.modalDetail = await props?.onWithdraw();
      })();
    },
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
    >
      <Box width="$19">
        <img
          src={props.imgSrc}
          className={props.isOtherChains ? styles.smImg : styles.lgImg}
        />
      </Box>
      <Stack attributes={{ alignItems: "center", flex: 1 }}>
        <Stack
          space="$0"
          direction="vertical"
          className={styles.fieldContainer}
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
          <Stack className={styles.fieldContainer}>
            <Show when={props.isOtherChains}>
              <Text fontSize={state.size} color="$textSecondary">
                {props.chainName}
              </Text>
            </Show>
          </Stack>
        </Show>
        <Stack
          space="$0"
          className={styles.fieldContainer}
          direction="vertical"
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
          <Stack className={styles.fieldContainer}></Stack>
        </Show>
        <Stack
          space="$5"
          className={styles.fieldContainer}
          attributes={{
            justifyContent: "flex-end",
          }}
        >
          <Show when={!!props.onDeposit}>
            <Button
              intent="text"
              size="sm"
              onClick={() => state.handleDposit()}
            >
              Deposit
            </Button>
          </Show>
          <Show when={!!props.onWithdraw}>
            <Button
              intent="text"
              size="sm"
              onClick={() => state.handleWithdraw()}
            >
              Withdraw
            </Button>
          </Show>
        </Stack>
      </Stack>
      <BasicModal
        isOpen={state.isOpen}
        title={`${state.transferType} ${state.modalDetail?.fromSymbol}`}
        onClose={() => (state.isOpen = false)}
      >
        <AssetItemTransfer
          type={state.transferType?.toLowerCase() as TransferType}
          fromSymbol={state.modalDetail?.fromSymbol}
          fromAddress={state.modalDetail?.fromAddress}
          fromImgSrc={state.modalDetail?.fromImgSrc}
          fromDenom={state.modalDetail?.fromDenom}
          toDenom={state.modalDetail?.toDenom}
          toAddress={state.modalDetail?.toAddress}
          toImgSrc={state.modalDetail?.toImgSrc}
          avaliable={state.modalDetail?.avaliable}
          priceDisplayAmount={state.modalDetail?.priceDisplayAmount}
          amount={state.modalDetail?.amount}
          onTransfer={(value) => state?.modalDetail?.onTransfer(value)}
          onCancel={() => {
            state.modalDetail?.onCancel?.();
            state.isOpen = false;
          }}
        />
      </BasicModal>
    </Stack>
  );
}
