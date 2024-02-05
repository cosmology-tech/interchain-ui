import {
  For,
  Show,
  useRef,
  onMount,
  onUnMount,
  useStore,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import { formatNumeric } from "../../helpers/number";
import Text from "../text";
import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import IconButton from "../icon-button";
import Stack from "../stack";
import Divider from "../divider";
import Bignumber from "bignumber.js";
import { toNumber } from "../../helpers/number";
import * as styles from "./liquid-staking.css";
import { scrollBar } from "../shared/shared.css";

import type { ThemeVariant } from "../../models/system.model";
import type {
  LiquidStakingProps,
  LiquidStakingToken,
} from "./liquid-staking.types";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-field"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<LiquidStakingProps>>({
  decimals: 6,
  rewardLabel: "What you'll get",
  accordionLabel: "Learn more",
  submitButtonLabel: "Liquid Stake",
  stakeLabel: "Select amount",
  footerLabel: "Powered by Cosmology",
  halfButtonLabel: "Half",
  maxButtonLabel: "Max",
  availableLabel: "Available",
});

export default function LiquidStaking(props: LiquidStakingProps) {
  let cleanupRef = useRef<() => void>(null);
  let scrollRef = useRef<HTMLDivElement | null>(null);
  let rootRef = useRef<HTMLDivElement | null>(null);
  let resizeObserver = useRef<ResizeObserver | null>(null);

  let state = useStore<{
    stakeToken: LiquidStakingToken | null;
    stakeAmount: number;
    rewardAmount: number;
    handleToggleExpand: () => void;
    handleStakeAmountChange: (stakeAmount: number) => void;
    handleStakeHalf: () => void;
    handleStakeMax: () => void;
    // ==== UI states
    theme: ThemeVariant;
    isMounted: boolean;
    isDirty: boolean;
    expanded: boolean;
    scrollOffset: number;
    isAccordionVisible: boolean;
    width: number;
    isSmallSize: () => boolean;
  }>({
    theme: "light",
    isMounted: false,
    isDirty: false,
    scrollOffset: 0,
    expanded: false,
    stakeToken: null,
    stakeAmount: 0,
    rewardAmount: 0,
    width: 0,
    handleToggleExpand() {
      if (!state.isDirty) {
        state.isDirty = true;
      }

      if (state.expanded) {
        if (scrollRef) {
          scrollRef.scrollTop = 0;
        }
        state.expanded = false;
      } else {
        state.expanded = true;
      }
    },
    handleStakeAmountChange(amount: number) {
      state.stakeAmount = amount;
      props?.onChange?.(amount);
    },
    handleStakeHalf() {
      if (typeof props.onHalf === "function") {
        return props.onHalf();
      }

      const result = new Bignumber(props.stakeToken.available ?? 0)
        .dividedBy(2)
        .toNumber();
      props.onChange?.(result);
    },
    handleStakeMax() {
      if (typeof props.onMax === "function") {
        return props.onMax();
      }

      const result = new Bignumber(props.stakeToken.available ?? 0).toNumber();
      props.onChange?.(result);
    },
    get isAccordionVisible() {
      return (
        Array.isArray(props.descriptionList) &&
        props.descriptionList?.length > 0
      );
    },
    isSmallSize() {
      return state.width < 326;
    },
  });

  onMount(() => {
    state.theme = store.getState().theme;
    state.isMounted = true;

    function handleScroll(_event: Event) {
      state.scrollOffset = scrollRef.scrollTop;
    }

    scrollRef.addEventListener("scroll", handleScroll);

    resizeObserver = new ResizeObserver((entries) => {
      const rootWidth = entries[0]?.borderBoxSize[0]?.inlineSize ?? 0;
      state.width = rootWidth;
    });

    resizeObserver.observe(rootRef, { box: "border-box" });

    const cleanupStore = store.subscribe((newState) => {
      state.theme = newState.theme;
    });

    cleanupRef = () => {
      cleanupStore();

      if (rootRef instanceof Element) {
        resizeObserver.unobserve(rootRef);
      }

      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
    };
    // Controlled prop
    if (props.stakeToken) {
      state.stakeToken = props.stakeToken;
    }
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      minHeight="444px"
      borderRadius="$md"
      p={state.isMounted ? (state.width < 350 ? "$4" : "$10") : "$10"}
      position="relative"
      backgroundColor={state.theme === "light" ? "$white" : "$blackPrimary"}
      className={clx(props.className, styles.root)}
      ref={rootRef}
      {...props.attributes}
      {...props.domAttributes}
    >
      {/* Staked token */}
      <Box bg="$cardBg" borderRadius="$md">
        <Stack
          direction="vertical"
          space="$6"
          attributes={
            state.isSmallSize()
              ? {
                  pl: "$4",
                  pr: "$4",
                  py: "$6",
                }
              : {
                  pl: "18px",
                  pr: "$8",
                  py: "$8",
                }
          }
        >
          <Stack
            direction="horizontal"
            space={state.isSmallSize() ? "$2" : "$4"}
            attributes={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Label */}
            <Text
              fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
              fontWeight="$normal"
              color="$textSecondary"
              attributes={{
                flexShrink: "0",
                flexGrow: "0",
              }}
            >
              {props.stakeLabel}
            </Text>

            <Stack
              direction="horizontal"
              space={state.isSmallSize() ? "$4" : "$8"}
              attributes={{
                flexShrink: "0",
                flexGrow: "1",
                justifyContent:
                  state.width < 396 ? "space-between" : "flex-end",
                alignItems: "center",
              }}
            >
              {/* Available amount */}
              <Stack direction="horizontal" space="$4">
                <Text
                  fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
                  fontWeight="$semibold"
                  color="$textSecondary"
                >
                  {props.availableLabel}
                </Text>
                <Text
                  fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
                  fontWeight="$semibold"
                  color="$text"
                >
                  {formatNumeric(
                    props.stakeToken.available ?? 0,
                    props.precision
                  )}
                </Text>
              </Stack>

              {/* Half and max btn */}
              <Stack
                direction="horizontal"
                space="$4"
                align="center"
                attributes={{
                  justifyContent: "flex-end",
                  flexGrow: "0",
                  flexShrink: "1",
                }}
              >
                <Button
                  variant="unstyled"
                  className={styles.headerButton[state.theme]}
                  size="xs"
                  onClick={() => state.handleStakeHalf()}
                >
                  <Box
                    as="span"
                    fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
                  >
                    {props.halfButtonLabel}
                  </Box>
                </Button>

                <Button
                  variant="unstyled"
                  className={styles.headerButton[state.theme]}
                  size="xs"
                  onClick={() => state.handleStakeMax()}
                >
                  <Box
                    as="span"
                    fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
                  >
                    {props.maxButtonLabel}
                  </Box>
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="horizontal"
            space="$8"
            domAttributes={{
              "data-part-id": "stake",
            }}
          >
            {/* Stake token icon */}
            <Box display="block" flexShrink="0">
              <Box
                as="img"
                attributes={{
                  src: props.stakeToken.imgSrc,
                  alt: props.stakeToken.symbol,
                }}
                width={state.isSmallSize() ? "28px" : "50px"}
                height={state.isSmallSize() ? "28px" : "50px"}
              />
            </Box>

            <Stack
              direction="horizontal"
              space="$0"
              attributes={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {/* Symbols */}
              <Stack
                direction="vertical"
                space="$1"
                attributes={{
                  justifyContent: "space-between",
                  flexShrink: "0",
                }}
                domAttributes={{
                  "data-part-id": "stake-symbol",
                }}
              >
                <Text
                  fontSize={
                    state.isSmallSize()
                      ? "$lg"
                      : {
                          mobile: "$lg",
                          mdMobile: "$3xl",
                        }
                  }
                  fontWeight="$semibold"
                  lineHeight="$shorter"
                >
                  {props.stakeToken.symbol}
                </Text>
                <Text
                  color="$textSecondary"
                  fontSize="$sm"
                  fontWeight="$normal"
                >
                  {props.stakeToken.name}
                </Text>
              </Stack>

              {/* Stake amount input */}
              <Stack
                direction="vertical"
                space="$1"
                attributes={{
                  width: {
                    mobile: "120px",
                    mdMobile: "228px",
                  },
                  alignItems: "flex-end",
                }}
                domAttributes={{
                  "data-part-id": "stake-amt",
                }}
              >
                {/* @ts-expect-error */}
                <ScaffoldNumberField
                  size="sm"
                  borderless
                  value={props.stakeAmount}
                  minValue={0}
                  maxValue={toNumber(props.stakeToken.available)}
                  onChange={(value) => state.handleStakeAmountChange(value)}
                  onBlur={(event) => {
                    const target = event.target as HTMLInputElement;
                    props.onBlur?.(Number(target.value));
                  }}
                  formatOptions={{
                    minimumFractionDigits: 0,
                    maximumFractionDigits: props.precision,
                  }}
                  inputClassName={clx(
                    styles.resetNumberInputBg,
                    state.isSmallSize()
                      ? styles.numberInputSm
                      : styles.numberInputMd
                  )}
                />

                <Text
                  color="$textSecondary"
                  fontSize="$xs"
                  fontWeight="$normal"
                >
                  $
                  {formatNumeric(
                    props.stakeToken.priceDisplayAmount,
                    props.precision
                  )}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Reward */}
      <Stack
        direction="vertical"
        space="$6"
        attributes={
          state.isSmallSize()
            ? {
                pl: "$4",
                pr: "$4",
                py: "$6",
              }
            : {
                pl: "18px",
                pr: "$8",
                py: "$8",
              }
        }
      >
        <Text
          fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
          fontWeight="$normal"
          color="$textSecondary"
        >
          {props.rewardLabel}
        </Text>

        <Stack
          direction="horizontal"
          space="$8"
          domAttributes={{
            "data-part-id": "reward",
          }}
        >
          {/* Reward token icon */}
          <Box display="block" flexShrink="0">
            <Box
              as="img"
              attributes={{
                src: props.reward.imgSrc,
                alt: props.reward.symbol,
              }}
              width={state.isSmallSize() ? "28px" : "50px"}
              height={state.isSmallSize() ? "28px" : "50px"}
            />
          </Box>

          <Stack
            direction="horizontal"
            space="$0"
            attributes={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Symbols */}
            <Stack
              direction="vertical"
              space="$1"
              domAttributes={{
                "data-part-id": "reward-symbol",
              }}
            >
              <Text
                fontSize={
                  state.isSmallSize()
                    ? "$lg"
                    : {
                        mobile: "$lg",
                        mdMobile: "$3xl",
                      }
                }
                fontWeight="$semibold"
                lineHeight="$shorter"
              >
                {props.reward.symbol}
              </Text>
              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                {props.reward.name}
              </Text>
            </Stack>

            {/* Rewards amt */}
            <Stack
              direction="vertical"
              space="$1"
              attributes={{
                alignItems: "flex-end",
              }}
              domAttributes={{
                "data-part-id": "reward-amt",
              }}
            >
              <Text
                fontSize={
                  state.isSmallSize()
                    ? "$lg"
                    : {
                        mobile: "$lg",
                        mdMobile: "$xl",
                      }
                }
                fontWeight="$semibold"
                lineHeight="$shorter"
              >
                {formatNumeric(props.reward.rewardAmount, props.precision)}
              </Text>

              <Text color="$textSecondary" fontSize="$xs" fontWeight="$normal">
                $
                {formatNumeric(
                  props.reward.priceDisplayAmount,
                  props.precision
                )}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Divider */}
      <Box
        py="$8"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="1px"
      >
        <Divider orientation="horizontal" />
      </Box>

      {/* Description list */}
      <Box
        position="relative"
        maxWidth="100%"
        minHeight="$16"
        attributes={{
          "data-part-id": "accordion",
        }}
      >
        {/* Accordion button */}
        <Box
          width="100%"
          position="absolute"
          right={0}
          top={0}
          attributes={{
            "data-part-id": "accordion-button-container",
          }}
        >
          <Stack
            direction="horizontal"
            space="$4"
            attributes={{
              py: "$4",
              position: "relative",
              justifyContent: "flex-end",
              zIndex: 1,
              overflowX: "clip",
              backgroundColor:
                state.theme === "light" ? "$white" : "$blackPrimary",
              width: state.scrollOffset > 0 ? "100%" : "$fit",
              marginLeft: "auto",
            }}
            domAttributes={{
              "data-part-id": "accordion-button",
            }}
          >
            <Show when={!state.isSmallSize()}>
              <Text
                as="p"
                fontSize={state.isSmallSize() ? "$2xs" : "$sm"}
                fontWeight="$semibold"
                color="$textSecondary"
                attributes={{
                  py: "$2",
                }}
              >
                {props.accordionLabel}
              </Text>
            </Show>

            <Show when={typeof props.renderAccordionButton === "function"}>
              {props.renderAccordionButton({
                expanded: state.expanded,
                onClick: () => {
                  state.handleToggleExpand();
                },
              })}
            </Show>

            <Show when={typeof props.renderAccordionButton !== "function"}>
              <IconButton
                size="sm"
                intent={state.expanded ? "tertiary" : "secondary"}
                icon={state.expanded ? "arrowUpS" : "arrowDownS"}
                iconSize={state.isSmallSize() ? "$4xl" : "$3xl"}
                onClick={() => state.handleToggleExpand()}
              />
            </Show>

            <Box
              p="$4"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={-1}
              transition="all 0.2s"
              backgroundColor={
                state.scrollOffset > 0
                  ? state.theme === "light"
                    ? "$white"
                    : "$blackPrimary"
                  : "transparent"
              }
              boxShadow={
                state.scrollOffset > 0
                  ? `
                  0px 3.8px 4.6px -5px rgba(0, 0, 0, 0.016),
                  0px 10px 11.6px -5px rgba(0, 0, 0, 0.022),
                  0px 21.4px 23.6px -5px rgba(0, 0, 0, 0.028),
                  0px 47.8px 48.5px -5px rgba(0, 0, 0, 0.034),
                  0px 200px 133px -5px rgba(0, 0, 0, 0.05)
              `
                  : "none"
              }
            />
          </Stack>
        </Box>

        <div
          ref={scrollRef}
          className={clx(
            {
              [styles.accordionPanel.expanded]: state.expanded && state.isDirty,
              [styles.accordionPanel.contracted]:
                !state.expanded && state.isDirty,
              [styles.accordionPanel.init]: !state.isDirty,
            },
            scrollBar[state.theme]
          )}
          data-part-id="scroll-container"
        >
          <Stack
            direction="vertical"
            space="$8"
            attributes={{
              paddingTop: "$2",
              paddingBottom: state.expanded ? "150px" : "$0",
            }}
            domAttributes={{
              "data-part-id": "description-list",
            }}
          >
            <For each={props.descriptionList}>
              {(listItem) => (
                <Stack key={listItem.title} direction="vertical" space="$4">
                  <Stack
                    direction="horizontal"
                    space="$4"
                    attributes={{ py: "$4", height: "$12" }}
                  >
                    <Text
                      as="p"
                      fontSize="$sm"
                      fontWeight="$semibold"
                      color="$textSecondary"
                    >
                      {listItem.title}
                    </Text>
                    <Text as="p" fontSize="$sm" fontWeight="$semibold">
                      {listItem.subtitle}
                    </Text>
                  </Stack>
                  <Text
                    as="p"
                    fontSize="$xs"
                    fontWeight="normal"
                    lineHeight="$base"
                  >
                    {listItem.desc}
                  </Text>
                </Stack>
              )}
            </For>

            <Show when={props.bottomLink}>
              <Box textAlign="center">
                <Box
                  as="a"
                  px="$4"
                  py="$2"
                  textDecoration="none"
                  borderRadius="$md"
                  display="inline-block"
                  backgroundColor="$background"
                  attributes={{
                    href: props.bottomLink.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }}
                >
                  <Stack
                    as="span"
                    space="$2"
                    direction="horizontal"
                    attributes={{
                      alignItems: "center",
                    }}
                  >
                    <Text as="span" color="$textSecondary" fontSize="$sm">
                      {props.bottomLink.label}
                    </Text>
                    <Icon
                      name="externalLinkLine"
                      color="$textSecondary"
                      size="$2xl"
                    />
                  </Stack>
                </Box>
              </Box>
            </Show>
          </Stack>
        </div>
      </Box>

      {/* Footer */}
      <Box
        position={state.expanded ? "absolute" : "relative"}
        bottom={state.expanded ? 0 : "unset"}
        left={state.expanded ? "0" : "unset"}
        right={state.expanded ? "0" : "unset"}
        width="$full"
        py="$4"
        px={state.expanded ? "$10" : "$0"}
        backgroundColor={state.theme === "light" ? "$white" : "$blackPrimary"}
        zIndex="$0"
        attributes={{
          "data-part-id": "footer",
        }}
      >
        <Stack direction="vertical" space={state.isSmallSize() ? "$6" : "$10"}>
          <Show when={typeof props.renderSubmitButton === "function"}>
            {props.renderSubmitButton()}
          </Show>

          <Show when={typeof props.renderSubmitButton !== "function"}>
            <Button
              fluidWidth
              onClick={(event) => props.onSubmit?.(event)}
              disabled={props.isSubmitDisabled}
              intent="tertiary"
              size={state.isSmallSize() ? "sm" : "lg"}
            >
              <Box
                as="span"
                mr={state.isSmallSize() ? "$4" : "$8"}
                fontSize={state.isSmallSize() ? "$xs" : "inherit"}
              >
                {props.submitButtonLabel}
              </Box>

              <Icon
                name="timeLine"
                color="inherit"
                attributes={{
                  mr: state.isSmallSize() ? "$2" : "$4",
                }}
              />

              <Text
                fontSize="$sm"
                fontWeight="$normal"
                as="span"
                color="inherit"
              >
                ≈ &nbsp; {props.timeEstimateLabel}
              </Text>
            </Button>
          </Show>

          <Text
            fontSize="$sm"
            fontWeight="$normal"
            color="$textSecondary"
            textAlign="center"
            domAttributes={{
              "data-part-id": "footer-label",
            }}
          >
            {props.footerLabel}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
