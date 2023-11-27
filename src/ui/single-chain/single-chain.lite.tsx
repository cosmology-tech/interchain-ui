import { useMetadata, Show, For } from "@builder.io/mitosis";
import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import Skeleton from "../skeleton";
import Reveal from "../reveal";
import type { SingleChainProps } from "./single-chain.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function SingleChain(props: SingleChainProps) {
  return (
    <Box className={props.className} {...props.attributes}>
      <Show when={!props.isLoading}>
        <AssetListHeader
          title={props.title}
          singleChainHeader={props.singleChainHeader}
          depositButtonLabel={props.depositButtonLabel}
          withdrawButtonLabel={props.withdrawButtonLabel}
          showDeposit={props.showDeposit}
          showWithdraw={props.showWithdraw}
          onDeposit={() => props.onDeposit?.()}
          onWithdraw={() => props.onWithdraw?.()}
        />

        <Text
          color="$textSecondary"
          fontSize="$lg"
          fontWeight="$semibold"
          attributes={{ marginTop: "$10", marginBottom: "$9" }}
        >
          {props.listTitle}
        </Text>

        <Show when={props.list.length > 4}>
          <Reveal hideThresholdHeight={400}>
            <AssetList
              needChainSpace={false}
              isOtherChains={false}
              list={props.list}
            />
          </Reveal>
        </Show>

        <Show when={props.list.length <= 4}>
          <AssetList
            needChainSpace={false}
            isOtherChains={false}
            list={props.list}
          />
        </Show>
      </Show>

      <Show when={!!props.isLoading}>
        {/* Header skeleton */}
        <Box backgroundColor="$cardBg" borderRadius="$lg" p="$10">
          <Text
            fontWeight="$semibold"
            attributes={{
              marginBottom: "$4",
            }}
          >
            {props.title}
          </Text>

          <Skeleton height="$12" width="40%" />
        </Box>

        <Box px="$6">
          <Text
            color="$textSecondary"
            fontSize="$lg"
            fontWeight="$semibold"
            attributes={{ marginTop: "$10", marginBottom: "$9" }}
          >
            {props.listTitle}
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="$10">
          <For each={[...Array(5).keys()]}>
            {(item) => (
              <Box key={item} display="flex" gap="$10">
                <Skeleton borderRadius="$full" height="$14" width="$14" />
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="$2"
                  justifyContent="center"
                >
                  <Skeleton height="$8" width="$15" />
                  <Skeleton height="$8" width="$17" />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  gap="$2"
                  justifyContent="center"
                  width="30%"
                >
                  <Skeleton height="$8" width="100%" />
                  <Skeleton height="$8" width="80%" />
                </Box>
              </Box>
            )}
          </For>
        </Box>
      </Show>
    </Box>
  );
}
