import { For, Show, useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import type { AssetListHeaderProps } from "./asset-list-header.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<AssetListHeaderProps>>({
  showDeposit: true,
  showWithdraw: true,
  withdrawButtonLabel: "Withdraw",
  depositButtonLabel: "Deposit",
});

export default function AssetListHeader(props: AssetListHeaderProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={props.className}
      {...props.attributes}
    >
      {/* Title */}
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        {props.title}
      </Text>

      {/* Multi chain */}
      <Show when={props.multiChainHeader}>
        <Box
          display="grid"
          gap="$10"
          gridTemplateAreas={{
            mobile: `
              "card1 card1"
              "card2 card2"
              "btn1 btn2"
            `,
            mdMobile: `
              "card1 card2"
              "btn1 btn2"
            `,
            tablet: `
              "card1 card2 btn1"
              "card1 card2 btn2"
            `,
          }}
        >
          <For each={props.multiChainHeader}>
            {(item, index: number) => (
              <Box
                key={item.label}
                gridArea={`card${index + 1}`}
                backgroundColor="$cardBg"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                borderRadius="$lg"
                py="$11"
                px="$10"
              >
                <Text color="$textSecondary" fontWeight="$semibold">
                  {item.label}
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
              </Box>
            )}
          </For>

          {/* ==== Buttons */}
          <Show when={!!props.onWithdraw}>
            <Box
              gridArea="btn1"
              maxWidth={{
                tablet: "$29",
              }}
              flex={{
                mobile: "1",
                tablet: "auto",
              }}
            >
              <Button
                fluidWidth
                variant="outlined"
                intent="secondary"
                onClick={() => props.onWithdraw?.()}
              >
                {props.withdrawButtonLabel ?? "Withdraw"}
              </Button>
            </Box>
          </Show>

          <Show when={!!props.onDeposit}>
            <Box
              gridArea="btn2"
              maxWidth={{
                tablet: "$29",
              }}
              flex={{
                mobile: "1",
                tablet: "auto",
              }}
            >
              <Button
                fluidWidth
                intent="tertiary"
                onClick={() => props.onDeposit?.()}
              >
                {props.depositButtonLabel ?? "Deposit"}
              </Button>
            </Box>
          </Show>
        </Box>
      </Show>

      {/* Single chain */}
      <Show when={props.singleChainHeader}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap="$10"
          justifyContent="space-between"
          alignItems="center"
          width="auto"
          minHeight="$21"
          py="$10"
          px="$10"
          backgroundColor="$cardBg"
          borderRadius="$lg"
        >
          <Stack direction="vertical">
            <Text>{props.singleChainHeader.label}</Text>
            <Stack
              attributes={{
                alignItems: "baseline",
              }}
            >
              <Text fontWeight="$semibold">$</Text>
              <Text fontSize="$4xl" fontWeight="$semibold">
                {props.singleChainHeader.value}
              </Text>
            </Stack>
          </Stack>

          {/* ==== Buttons */}
          <Box
            display="flex"
            flex="1"
            alignItems="center"
            justifyContent={{
              mobile: "space-between",
              tablet: "flex-end",
            }}
            gap={{
              mobile: "$6",
              tablet: "$12",
              desktop: "$12",
            }}
          >
            <Show
              when={
                typeof props.onWithdraw === "function" && props.showWithdraw
              }
            >
              <Box
                flex={{
                  mobile: "1",
                  tablet: "0 0 auto",
                }}
                width={{
                  mobile: "auto",
                  tablet: "$25",
                  desktop: "$25",
                }}
              >
                <Button
                  fluidWidth
                  variant="outlined"
                  intent="secondary"
                  onClick={() => props.onWithdraw?.()}
                >
                  {props.withdrawButtonLabel}
                </Button>
              </Box>
            </Show>

            <Show
              when={typeof props.onDeposit === "function" && props.showDeposit}
            >
              <Box
                flex={{
                  mobile: "1",
                  tablet: "0 0 auto",
                }}
                width={{
                  mobile: "auto",
                  tablet: "$25",
                  desktop: "$25",
                }}
              >
                <Button
                  fluidWidth
                  intent="tertiary"
                  onClick={() => props.onDeposit?.()}
                >
                  {props.depositButtonLabel}
                </Button>
              </Box>
            </Show>
          </Box>
        </Box>
      </Show>
    </Box>
  );
}
