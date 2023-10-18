import {
  For,
  Show,
  useRef,
  onMount,
  onUnMount,
  useStore,
  useDefaultProps,
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
import TransferItem from "../transfer-item";

import * as styles from "./liquid-staking.css";
import { scrollBar } from "../shared/shared.css";

import type { ThemeVariant } from "../../models/system.model";
import type {
  LiquidStakingProps,
  LiquidStakingToken,
} from "./liquid-staking.types";

useDefaultProps<Partial<LiquidStakingProps>>({
  decimals: 6,
  rewardLabel: "What you'll get",
  accordionLabel: "Learn more",
  submitButtonLabel: "Liquid Stake",
  stakeLabel: "Select amount",
  footerLabel: "Powered by Cosmology",
});

export default function LiquidStaking(props: LiquidStakingProps) {
  let cleanupRef = useRef<() => void>(null);
  let scrollRef = useRef<HTMLDivElement | null>(null);

  let state = useStore<{
    theme: ThemeVariant;
    expanded: boolean;
    scrollOffset: number;
    stakeToken: LiquidStakingToken | null;
    stakeAmount: string;
    rewardAmount: string;
    handleToggleExpand: () => void;
    handleStakeTokenSelected: (item: LiquidStakingToken) => void;
    handleStakeAmountChange: (item: LiquidStakingToken, value: string) => void;
    isAccordionVisible: boolean;
  }>({
    theme: "light",
    scrollOffset: 0,
    expanded: false,
    stakeToken: null,
    stakeAmount: "0",
    rewardAmount: "0",
    handleToggleExpand() {
      if (state.expanded) {
        if (scrollRef) {
          scrollRef.scrollTop = 0;
        }
        state.expanded = false;
      } else {
        state.expanded = true;
      }
    },
    handleStakeTokenSelected(selectedItem) {
      if (!selectedItem) return;
      state.stakeToken = selectedItem;
      props?.onChange?.({
        stakeToken: selectedItem,
        stakeAmount: state.stakeAmount,
      });
    },
    handleStakeAmountChange(selectedItem: LiquidStakingToken, value: string) {
      state.stakeAmount = value;
      props?.onChange?.({
        stakeToken: selectedItem,
        stakeAmount: state.stakeAmount,
      });
    },
    get isAccordionVisible() {
      return (
        Array.isArray(props.descriptionList) &&
        props.descriptionList?.length > 0
      );
    },
  });

  onMount(() => {
    state.theme = store.getState().theme;

    function handleScroll(_event: Event) {
      state.scrollOffset = scrollRef.scrollTop;
    }

    scrollRef.addEventListener("scroll", handleScroll);

    const cleanupStore = store.subscribe((newState) => {
      state.theme = newState.theme;
    });

    cleanupRef = () => {
      cleanupStore();

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
      pt="$8"
      position="relative"
      className={props.className}
      ref={props.forwardedRef}
      {...props.attributes}
      {...props.domAttributes}
    >
      {/* Staked token */}
      <TransferItem
        halfBtn
        maxBtn
        hasAvailable
        title={props.stakeLabel}
        amount={String(state.stakeToken?.available ?? 0)}
        selectedItem={state.stakeToken}
        dropDownList={props.options}
        onItemSelected={(selectedItem: LiquidStakingToken) =>
          state.handleStakeTokenSelected(selectedItem)
        }
        onChange={(item: LiquidStakingToken, value: string) =>
          state.handleStakeAmountChange(item, value)
        }
      />

      {/* Reward */}
      <Stack
        direction="vertical"
        space="$6"
        attributes={{
          pl: "18px",
          pr: "$8",
          py: "$8",
        }}
      >
        <Text fontSize="$sm" fontWeight="$normal" color="$textSecondary">
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
          <Box display="block" width="50px" height="50px" flexShrink="0">
            <img
              src={props.reward.imgSrc}
              width="50"
              height="50"
              alt={props.reward.symbol}
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
                fontSize="$3xl"
                fontWeight="$semibold"
                lineHeight="$shorter"
              >
                {props.reward.symbol}
              </Text>
              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                {props.reward.denom}
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
                fontSize="$3xl"
                fontWeight="$semibold"
                lineHeight="$shorter"
              >
                {formatNumeric(props.reward.rewardAmount, props.precision)}
              </Text>

              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
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
        maxWidth="468px"
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
              p: "$4",
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
            <Text
              as="p"
              fontSize="$sm"
              fontWeight="$semibold"
              color="$textSecondary"
              attributes={{
                py: "$2",
              }}
            >
              {props.accordionLabel}
            </Text>

            <IconButton
              size="sm"
              intent={state.expanded ? "tertiary" : "secondary"}
              icon={state.expanded ? "arrowUpS" : "arrowDownS"}
              iconSize="$3xl"
              onClick={() => state.handleToggleExpand()}
            />

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
                  : "$none"
              }
            />
          </Stack>
        </Box>

        <div
          ref={scrollRef}
          className={clx(
            state.expanded
              ? styles.accordionPanel.expanded
              : styles.accordionPanel.contracted,
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
                <Stack direction="vertical" space="$4">
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
        width="$full"
        py="$4"
        backgroundColor={state.theme === "light" ? "$white" : "$blackPrimary"}
        attributes={{
          "data-part-id": "footer",
        }}
      >
        <Stack direction="vertical" space="$10">
          <Button
            onClick={(event) => props.onSubmit?.(event)}
            disabled={props.isSubmitDisabled}
            intent="tertiary"
            size="lg"
            attributes={{ width: "$full" }}
          >
            <Box as="span" mr="$8">
              {props.submitButtonLabel}
            </Box>

            <Icon
              name="timeLine"
              color="inherit"
              attributes={{
                mr: "$4",
              }}
            />

            <Text fontSize="$sm" fontWeight="$normal" as="span" color="inherit">
              ≈ &nbsp; {props.timeEstimateLabel}
            </Text>
          </Button>

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
