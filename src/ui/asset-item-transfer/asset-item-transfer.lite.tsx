import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
} from "@builder.io/mitosis";
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
import TextField from "../text-field";
import clsx from "clsx";

export default function AssetItemTransfer(props: AssetItemTransferProps) {
  const state = useStore<{
    theme: ThemeVariant;
    inputAmount: string;
    toAddress: string;
    lgAddressVisible: boolean;
    smAddressVisible: boolean;
    reverseAnimation: boolean;
    handleAmountChange: (percent: number) => void;
    onAmountChange: (value: string) => void;
    transferDisabled: boolean;
  }>({
    theme: "light",
    inputAmount: "",
    toAddress: "",
    lgAddressVisible: false,
    smAddressVisible: false,
    reverseAnimation: false,
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
    state.toAddress = props.toAddress;
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
      <Box
        className={clsx({
          [styles.smPanelHide]: state.smAddressVisible,
        })}
      >
        <Stack
          className={styles.onlySm}
          attributes={{
            marginTop: "$11",
            marginBottom: "$13",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
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
          <img
            className={styles.img}
            alt={props.toDenom}
            src={props.toImgSrc}
          />
          <Box
            attributes={{
              position: "absolute",
              right: "0",
            }}
          >
            <IconButton
              icon="informationLine"
              variant="unstyled"
              onClick={() => {
                state.smAddressVisible = true;
              }}
            />
          </Box>
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
          <Stack
            direction="vertical"
            className={styles.flex1}
            attributes={{
              position: "relative",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{
                marginBottom: "$6",
              }}
            >
              {`To ${props.toDenom}`}
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
              <Text
                color="$textSecondary"
                attributes={{
                  flex: "1",
                }}
              >
                {truncateTextMiddle(props.toAddress, 12)}
              </Text>
              <IconButton
                icon="pencilLine"
                intent="text"
                attributes={{
                  height: "$auto",
                  minWidth: "$12",
                }}
                onClick={() => {
                  state.lgAddressVisible = true;
                }}
              />
            </Stack>
            <Show when={state.lgAddressVisible}>
              <Box
                className={clsx(styles.addressBackground, {
                  [styles.addressBackgroundReverse]: state.reverseAnimation,
                })}
              />
              <Box
                attributes={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  zIndex: "1",
                }}
                className={clsx(styles.addressContainer, {
                  [styles.addressContainerReverse]: state.reverseAnimation,
                })}
              >
                <Text
                  color="$textSecondary"
                  fontWeight="$semibold"
                  ellipsis
                  attributes={{
                    paddingBottom: "$6",
                    backgroundColor: "$transferMask",
                  }}
                >
                  {`To ${props.toDenom}`}
                </Text>
                <TextField
                  id="to-address"
                  value={state.toAddress}
                  onChange={(e) => {
                    state.toAddress = e.target.value;
                    props?.onAddressChange(e.target.value);
                  }}
                  inputClassName={styles.addressInput}
                />
                <Stack
                  attributes={{
                    position: "absolute",
                    left: "$7",
                    bottom: "$0",
                    height: "54px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    as="img"
                    width="$11"
                    height="$11"
                    borderRadius="$full"
                    attributes={{ src: props?.toImgSrc }}
                  />
                </Stack>
                <IconButton
                  icon="checkFill"
                  intent="tertiary"
                  size="lg"
                  attributes={{
                    minWidth: "$15",
                  }}
                  className={styles.checkIcon}
                  onClick={() => {
                    state.reverseAnimation = true;
                    props?.onAddressConfirm?.();
                    setTimeout(() => {
                      state.lgAddressVisible = false;
                      state.reverseAnimation = false;
                    }, 500);
                  }}
                />
              </Box>
            </Show>
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
          inputClass={styles.inputClass}
          imgClass={styles.imgClass}
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
            color="$text"
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
              className={styles.onlySm}
              attributes={{
                alignItems: "center",
              }}
            >
              <Icon
                name="timeLine"
                size="$lg"
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
      <Show when={state.smAddressVisible}>
        <Box
          position="absolute"
          width="$28"
          backgroundColor="$transferMask"
          top="-78px"
          zIndex="1"
        >
          <Button
            variant="unstyled"
            attributes={{ paddingLeft: "0" }}
            onClick={() => {
              state.smAddressVisible = false;
            }}
          >
            <Icon name="arrowLeftSLine" size="$3xl" />
          </Button>
        </Box>
        <Box
          position="absolute"
          width="$full"
          height="$full"
          top="0"
          left="0"
          className={styles.smPanelShow}
        >
          <Box
            attributes={{
              position: "relative",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{
                paddingBottom: "$6",
                backgroundColor: "$transferMask",
              }}
            >
              {`From ${props.fromDenom}`}
            </Text>
            <TextField
              id="from-address"
              disabled
              value={props.fromAddress}
              onChange={(e) => {}}
              inputClassName={clsx(
                styles.addressInput,
                styles.fromAddressInput
              )}
              attributes={{
                marginBottom: "$11",
              }}
            />
            <Stack
              attributes={{
                position: "absolute",
                left: "$7",
                bottom: "$0",
                height: "54px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                borderRadius="$full"
                attributes={{ src: props?.fromImgSrc }}
              />
            </Stack>
          </Box>
          <Box
            attributes={{
              position: "relative",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{
                paddingBottom: "$6",
                backgroundColor: "$transferMask",
              }}
            >
              {`To ${props.toDenom}`}
            </Text>
            <TextField
              id="to-address"
              value={state.toAddress}
              onChange={(e) => {
                state.toAddress = e.target.value;
                props?.onAddressChange(e.target.value);
              }}
              inputClassName={styles.addressInput}
            />
            <Stack
              attributes={{
                position: "absolute",
                left: "$7",
                bottom: "$0",
                height: "54px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                borderRadius="$full"
                attributes={{ src: props?.toImgSrc }}
              />
            </Stack>
            <IconButton
              icon="checkFill"
              intent="tertiary"
              size="lg"
              attributes={{
                minWidth: "$15",
              }}
              className={styles.checkIcon}
              onClick={() => {
                state.reverseAnimation = true;
                props?.onAddressConfirm?.();
                setTimeout(() => {
                  state.lgAddressVisible = false;
                  state.reverseAnimation = false;
                }, 500);
              }}
            />
          </Box>
        </Box>
      </Show>
    </Box>
  );
}
