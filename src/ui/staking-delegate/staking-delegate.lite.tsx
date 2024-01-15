import { useDefaultProps, useMetadata, Show, For } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Avatar from "../avatar";
import Text from "../text";
import StakingDelegateInput from "./staking-delegate-input.lite";
import StakingDelegateCard from "./staking-delegate-card.lite";

import type { StakingDelegateProps } from "./staking-delegate.types";

useMetadata({
  scaffolds: ["number-field"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<StakingDelegateProps>>({});

export default function StakingDelegate(props: StakingDelegateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$12"
      {...props.attributes}
      className={props.className}
    >
      {/* header */}
      <Stack
        direction="horizontal"
        space="$8"
        attributes={{
          alignItems: "center",
        }}
      >
        <Avatar
          name={props.header?.title ?? "Staking validator avatar"}
          size="lg"
          src={props.header?.avatarUrl ?? ""}
        />
        <Stack direction="vertical" space="$2">
          <Show when={!!props.header?.title}>
            <Text fontSize="$lg" fontWeight="$semibold" color="$text">
              {props.header?.title}
            </Text>
          </Show>
          <Show when={!!props.header?.subtitle}>
            <Text fontSize="$md" fontWeight="$normal" color="$textSecondary">
              {props.header?.subtitle}
            </Text>
          </Show>
        </Stack>
      </Stack>

      {/* Header extra */}
      <Show when={props.headerExtra}>{props.headerExtra}</Show>

      {/* Delegation card list */}
      <Show when={props.delegationItems && props.delegationItems.length > 0}>
        <Box display="flex" alignItems="center" gap="$10" flexWrap="wrap">
          <For each={props.delegationItems}>
            {(item) => (
              <StakingDelegateCard
                key={item.label}
                label={item.label}
                tokenAmount={item.tokenAmount}
                tokenName={item.tokenName}
                isLoading={item.isLoading}
              />
            )}
          </For>
        </Box>
      </Show>

      {/* Input */}
      <Show when={!!props.inputProps}>
        <StakingDelegateInput {...props.inputProps} />
      </Show>

      {/* Footer */}
      <Show when={!!props.footer}>{props.footer}</Show>
    </Box>
  );
}
