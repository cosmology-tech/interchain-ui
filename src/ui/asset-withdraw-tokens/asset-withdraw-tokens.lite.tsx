import {
  Show,
  For,
  useStore,
  useDefaultProps,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import Box from "../box";
import TokenInput from "../token-input";
import * as styles from "./asset-withdraw-tokens.css";
import { store } from "../../models/store";
import { truncateTextMiddle } from "../../helpers/string";
import IconButton from "../icon-button";
import TextField from "../text-field";

import { rootInput } from "../text-field/text-field.css";
import { standardTransitionProperties } from "../shared/shared.css";

import type { ThemeVariant } from "../../models/system.model";
import type { AssetWithdrawTokensProps } from "./asset-withdraw-tokens.types";

// TODO: fix inputBorderAndShadow and buttons intent

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<AssetWithdrawTokensProps>>({
  transferLabel: "Transfer",
  cancelLabel: "Cancel",
  partials: [
    {
      label: "Max",
      percentage: 1,
    },
    {
      label: "1/2",
      percentage: 0.5,
    },
    {
      label: "1/3",
      percentage: 1 / 3,
    },
  ],
});

export default function AssetWithdrawTokens(props: AssetWithdrawTokensProps) {
  const state = useStore<{
    theme: ThemeVariant;
    inputAmount: number;
    toAddress: string;
    lgAddressVisible: boolean;
    smAddressVisible: boolean;
    reverseAnimation: boolean;
    handleConfirmAddress: () => void;
    handleAmountChange: (percent: number) => void;
    onAmountChange: (value: number) => void;
  }>({
    theme: "light",
    inputAmount: 0,
    toAddress: "",
    lgAddressVisible: false,
    smAddressVisible: false,
    reverseAnimation: false,
    handleConfirmAddress() {
      props.onAddressConfirm?.();
      state.reverseAnimation = true;
      state.lgAddressVisible = false;
      state.smAddressVisible = false;
      state.reverseAnimation = false;
    },
    handleAmountChange(percent) {
      const newAmount = new BigNumber(props.available)
        .multipliedBy(percent)
        .toNumber();
      state.inputAmount = newAmount;
      props.onChange?.(new BigNumber(newAmount).toString());
    },
    onAmountChange(value) {
      state.inputAmount = value;
      props.onChange?.(new BigNumber(value).toString());
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
    <Box
      className={props.className}
      position="relative"
      minWidth={{
        mobile: "unset",
        mdMobile: "340px",
      }}
      maxWidth={{
        mobile: "unset",
        mdMobile: "460px",
      }}
    >
      <Box visibility={state.smAddressVisible ? "hidden" : "visible"}>
        <Stack
          className={styles.onlySm}
          attributes={{
            marginTop: "$11",
            marginBottom: "$13",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          domAttributes={{
            "data-part-id": "address-fields-sm",
          }}
        >
          <Box
            as="img"
            width="$15"
            height="$15"
            attributes={{
              alt: props.fromName,
              src: props.fromImgSrc,
            }}
          />
          <Icon
            name="arrowRightLine"
            color="$textSecondary"
            size="$xl"
            attributes={{
              mx: "$9",
            }}
          />

          <Box
            as="img"
            width="$15"
            height="$15"
            attributes={{
              alt: props.toName,
              src: props.toImgSrc,
            }}
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
            paddingTop: "$13",
            paddingBottom: "$10",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          domAttributes={{
            "data-part-id": "address-fields-lg",
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
              {`From ${props.fromName}`}
            </Text>
            <Stack
              space="$8"
              attributes={{
                p: "$6",
                backgroundColor: "$cardBg",
                borderRadius: "$lg",
                alignItems: "center",
              }}
              className={clsx(rootInput, standardTransitionProperties)}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                attributes={{
                  alt: props.fromName,
                  src: props.fromImgSrc,
                }}
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
            domAttributes={{
              "data-part-id": "to-address",
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
              {`To ${props.toName}`}
            </Text>

            <Stack
              space="$8"
              attributes={{
                p: "$6",
                height: "52px",
                backgroundColor: "$cardBg",
                borderRadius: "$lg",
                alignItems: "center",
              }}
              domAttributes={{
                "data-part-id": "to-address-input",
              }}
              className={clsx(rootInput, standardTransitionProperties)}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                attributes={{
                  alt: props.toName,
                  src: props.toImgSrc,
                }}
              />

              <Text
                color="$textSecondary"
                attributes={{
                  flex: "1",
                  whiteSpace: "nowrap",
                }}
              >
                {truncateTextMiddle(props.toAddress, 12)}
              </Text>

              <IconButton
                icon="pencilLine"
                size="sm"
                iconSize="$lg"
                attributes={{
                  height: "$auto",
                }}
                onClick={() => {
                  state.lgAddressVisible = true;
                }}
              />
            </Stack>

            {/* Slide-out toAddress input background */}
            <Box
              display={state.lgAddressVisible ? "block" : "none"}
              className={clsx(
                styles.addressBackground,
                styles.transferMask[state.theme],
                {
                  [styles.addressBackgroundReverse]: state.reverseAnimation,
                },
              )}
            />

            {/* Slide-out toAddress input field */}
            <Box
              display={state.lgAddressVisible ? "block" : "none"}
              position="absolute"
              bottom="0"
              right="0"
              top="0"
              zIndex="1"
              backgroundColor={
                state.theme === "light" ? "$white" : "$blackPrimary"
              }
              className={clsx(styles.addressContainer, {
                [styles.addressContainerReverse]: state.reverseAnimation,
              })}
            >
              <Box
                position="relative"
                attributes={{
                  "data-part-id": "to-address-field-container",
                }}
              >
                <Text
                  className={styles.transferMask[state.theme]}
                  color="$textSecondary"
                  fontWeight="$semibold"
                  ellipsis
                  attributes={{
                    paddingBottom: "$6",
                  }}
                >
                  {`To ${props.toName}`}
                </Text>

                <TextField
                  id="to-address"
                  value={state.toAddress}
                  onChange={(e) => {
                    state.toAddress = e.target.value;
                    props.onAddressChange(e.target.value);
                  }}
                  inputClassName={styles.addressInput}
                />

                <Stack
                  attributes={{
                    position: "absolute",
                    left: "$7",
                    bottom: "$0",
                    height: "48px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    as="img"
                    width="$11"
                    height="$11"
                    borderRadius="$full"
                    attributes={{ src: props.toImgSrc }}
                  />
                </Stack>
                <IconButton
                  icon="checkFill"
                  size="md"
                  attributes={{
                    px: "$0",
                  }}
                  className={styles.checkIcon}
                  onClick={() => {
                    state.handleConfirmAddress();
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>

        <TokenInput
          title="Select amount"
          hasProgressBar={false}
          amount={state.inputAmount}
          priceDisplayAmount={props.priceDisplayAmount}
          symbol={props.fromSymbol}
          name={props.fromName}
          available={props.available}
          tokenIcon={props.fromImgSrc}
          onAmountChange={(value) => state.onAmountChange(value)}
          inputClass={styles.bgClass[state.theme]}
          imgClass={styles.bgClass[state.theme]}
        />

        <Stack
          space="$5"
          attributes={{
            marginTop: "$5",
            marginBottom: "$11",
            justifyContent: "flex-end",
          }}
        >
          <For each={props.partials}>
            {(partial, index) => (
              <Button
                key={index}
                variant="unstyled"
                size="xs"
                onClick={() => state.handleAmountChange(partial.percentage)}
              >
                {partial.label}
              </Button>
            )}
          </For>
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
          <Text
            attributes={{
              marginRight: "$7",
            }}
          >
            Estimated time:
          </Text>
          <Text fontWeight="$semibold">{props.timeEstimateLabel}</Text>
        </Stack>

        <Button
          size="lg"
          fluidWidth
          onClick={() => props.onTransfer?.()}
          disabled={props.isSubmitDisabled}
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
              {props.transferLabel}
            </Text>

            <Show when={!!props.timeEstimateLabel}>
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
                  ≈ {props.timeEstimateLabel}
                </Text>
              </Stack>
            </Show>
          </Stack>
        </Button>
        <Button
          variant="unstyled"
          size="lg"
          fluidWidth
          attributes={{ marginTop: "$5" }}
          onClick={() => props.onCancel?.()}
        >
          {props.cancelLabel}
        </Button>
      </Box>

      {/* Sm breakpoint address panel */}
      <Box visibility={state.smAddressVisible ? "visible" : "hidden"}>
        {/* Back button */}
        <Box
          position="absolute"
          width="$28"
          className={clsx(styles.transferMask[state.theme], {
            [styles.smPanelShow]: state.smAddressVisible,
            [styles.smPanelHide]: !state.smAddressVisible,
          })}
          top="-76px"
          left="-14px"
          zIndex="1"
        >
          <IconButton
            icon="arrowLeftSLine"
            iconSize="$4xl"
            variant="unstyled"
            onClick={() => {
              state.smAddressVisible = false;
            }}
          />
        </Box>

        {/* Address fields */}
        <Box
          position="absolute"
          width="$full"
          height="$full"
          top="0"
          left="0"
          attributes={{
            "data-part-id": "sm-panel",
          }}
          className={clsx({
            [styles.smPanelShow]: state.smAddressVisible,
            [styles.smPanelHide]: !state.smAddressVisible,
          })}
        >
          <Box
            attributes={{
              position: "relative",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              className={styles.transferMask[state.theme]}
              ellipsis
              attributes={{
                paddingBottom: "$6",
              }}
            >
              {`From ${props.fromName}`}
            </Text>
            <TextField
              id="from-address"
              disabled
              value={props.fromAddress}
              inputClassName={clsx(
                styles.addressInput,
                styles.fromAddressInput,
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
                height: "48px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                borderRadius="$full"
                attributes={{ src: props.fromImgSrc }}
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
              className={styles.transferMask[state.theme]}
              attributes={{
                paddingBottom: "$6",
              }}
            >
              {`To ${props.toName}`}
            </Text>
            <TextField
              id="to-address"
              value={state.toAddress}
              onChange={(e) => {
                state.toAddress = e.target.value;
                props.onAddressChange(e.target.value);
              }}
              inputClassName={styles.addressInput}
            />
            <Stack
              attributes={{
                position: "absolute",
                left: "$7",
                bottom: "$0",
                height: "48px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                borderRadius="$full"
                attributes={{ src: props.toImgSrc }}
              />
            </Stack>
            <IconButton
              icon="checkFill"
              size="lg"
              attributes={{
                minWidth: "$15",
              }}
              className={styles.checkIcon}
              onClick={() => {
                state.handleConfirmAddress();
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
