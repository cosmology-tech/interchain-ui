import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import Box from "../box";
import TokenInput from "../token-input";
import * as styles from "./asset-item-transfer.css";
import { store } from "../../models/store";
import { AssetItemTransferProps } from "./asset-item-transfer.types";
import { ThemeVariant } from "../../models/system.model";
import { truncateTextMiddle } from "../../helpers/string";
import IconButton from "../icon-button";

export default function AssetItemTransfer(props: AssetItemTransferProps) {
  const state = useStore<{
    theme: ThemeVariant;
    inputAmount: string;
    handleAmountChange: (percent: number) => void;
    onAmountChange: (value: string) => void;
    transferDisabled: boolean;
  }>({
    theme: "light",
    inputAmount: "",
    handleAmountChange(percent) {
      state.inputAmount = new BigNumber(props.available)
        .multipliedBy(percent)
        .toString();
    },
    onAmountChange(value) {
      state.inputAmount = value;
      props?.onChange?.(value);
    },
    get transferDisabled() {
      return (
        new BigNumber(state.inputAmount).gt(props.available) ||
        state.inputAmount === ""
      );
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    console.log("props.", props);
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box className={styles.container}>
      <Stack
        className={styles.onlySm}
        attributes={{
          marginTop: "$11",
          marginBottom: "$13",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt={props.fromDenom}
          className={styles.img}
          src={props.fromImgSrc}
        />
        <Icon
          name="arrowRightLine"
          color="$textSecondary"
          size="$xl"
          attributes={{
            mx: "$9",
          }}
        />
        <img className={styles.img} alt={props.toDenom} src={props.toImgSrc} />
      </Stack>
      <Stack
        className={styles.onlyLg}
        attributes={{
          marginTop: "$13",
          marginBottom: "$10",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Stack direction="vertical" className={styles.flex1}>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            ellipsis
            attributes={{
              marginBottom: "$6",
            }}
          >
            {`From ${props.fromDenom}`}
          </Text>
          <Stack
            attributes={{
              p: "$6",
              backgroundColor: "$cardBg",
              borderRadius: "$lg",
              alignItems: "center",
            }}
          >
            <img
              alt={props.fromDenom}
              className={styles.smImg}
              src={props.fromImgSrc}
            />
            <Text color="$textSecondary">
              {truncateTextMiddle(props.fromAddress, 12)}
            </Text>
          </Stack>
        </Stack>
        <Icon
          name="arrowRightLine"
          color="$textSecondary"
          size="$md"
          attributes={{
            mx: "$4",
            marginBottom: "$9",
          }}
        />
        <Stack direction="vertical" className={styles.flex1}>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            ellipsis
            attributes={{
              marginBottom: "$6",
            }}
          >
            {`From ${props.toDenom}`}
          </Text>
          <Stack
            attributes={{
              p: "$6",
              backgroundColor: "$cardBg",
              borderRadius: "$lg",
              alignItems: "center",
            }}
          >
            <img
              alt={props?.toDenom}
              className={styles.smImg}
              src={props.toImgSrc}
            />
            <Text color="$textSecondary" attributes={{
              flex: "1"
            }}>
              {truncateTextMiddle(props.toAddress, 12)}
            </Text>
            {/* <IconButton icon="pencilLine" intent="text"  /> */}
          </Stack>
        </Stack>
      </Stack>
      <TokenInput
        title="Select amount"
        hasProgressBar={false}
        amount={state.inputAmount}
        priceDisplayAmount={props.priceDisplayAmount}
        symbol={props.fromSymbol}
        denom={props.fromDenom}
        available={props.available}
        imgSrc={props.fromImgSrc}
        onAmountChange={(value) => state.onAmountChange(value)}
      />

      <Stack
        space="$5"
        attributes={{
          marginTop: "$5",
          marginBottom: "$11",
          justifyContent: "flex-end",
        }}
      >
        <Button
          intent="text"
          size="xs"
          onClick={() => state.handleAmountChange(1)}
        >
          Max
        </Button>
        <Button
          intent="text"
          size="xs"
          onClick={() => state.handleAmountChange(1 / 2)}
        >
          1/2
        </Button>
        <Button
          intent="text"
          size="xs"
          onClick={() => state.handleAmountChange(1 / 3)}
        >
          1/3
        </Button>
      </Stack>
      <Stack
        className={styles.onlyLg}
        attributes={{
          p: "$6",
          marginBottom: "$9",
          borderRadius: "$md",
          backgroundColor: "$cardBg",
          alignItems: "center",
        }}
      >
        <Icon
          name="timeLine"
          size="md"
          attributes={{
            marginRight: "$7",
          }}
        />
        <Text>Estimated time:</Text>
        <Text fontWeight="$semibold"> 20 seconds</Text>
      </Stack>

      <Button
        intent="tertiary"
        size="lg"
        attributes={{ width: "$full" }}
        onClick={() => props?.onTransfer?.()}
        disabled={state.transferDisabled}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text
            className={styles.btnText[state.theme]}
            fontSize="$lg"
            fontWeight="$semibold"
          >
            Transfer
          </Text>

          <Stack
            className={styles.onlyLg}
            attributes={{
              alignItems: "center",
            }}
          >
            <Icon
              name="timeLine"
              size="$xs"
              attributes={{
                marginLeft: "$8",
                marginRight: "$4",
              }}
            />

            <Text fontSize="$xs" className={styles.btnText[state.theme]}>
              ≈ 20 seconds
            </Text>
          </Stack>
        </Stack>
      </Button>
      <Button
        variant="unstyled"
        size="lg"
        attributes={{ width: "$full", marginTop: "$5" }}
        onClick={() => props?.onCancel?.()}
      >
        Cancel
      </Button>
    </Box>
  );
}
