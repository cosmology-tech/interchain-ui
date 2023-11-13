import {
  useStore,
  useDefaultProps,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pools-header.css";
import { standardTransitionProperties } from "../shared/shared.css";
import type { PoolsHeaderProps } from "./pools-header.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<PoolsHeaderProps>>({
  title: "Liquidity Pools",
});

export default function PoolsHeader(props: PoolsHeaderProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box {...props.attributes} className={props.className}>
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        {props.title}
      </Text>

      <Box
        className={standardTransitionProperties}
        gap="$10"
        display="grid"
        gridTemplateAreas={{
          mobile: `
            "a b"
            "c c"
          `,
          desktop: `
            "a b c"
          `,
        }}
        gridTemplateColumns={{
          mobile: "repeat(auto-fill, minmax(180px, 1fr))",
          tablet: "repeat(2, 1fr)",
          desktop: "repeat(3, 1fr)",
        }}
      >
        <Box gridArea="a" className={styles.baseBox}>
          <Stack
            attributes={{
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <img
              className={styles.image}
              src={props.tokenData.iconUrl}
              alt={props.tokenData.title}
            />
            <Box lineHeight="$shorter">
              <Text
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize="$sm"
                className={styles.mb3}
              >
                {props.tokenData.title}
              </Text>
              <Stack
                space="$0"
                attributes={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  className={styles.dollar}
                  color="$text"
                  fontWeight="$semibold"
                  lineHeight="$shorter"
                >
                  $
                </Text>
                <Text
                  color="$text"
                  fontSize={{
                    mobile: "$2xl",
                    tablet: "$4xl",
                    desktop: "$4xl",
                  }}
                  fontWeight="$semibold"
                >
                  {store
                    .getState()
                    ?.formatNumber?.({ value: props.tokenData.price })}
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Box gridArea="b" className={styles.baseBox}>
          <Stack
            space="$0"
            direction="vertical"
            attributes={{
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize="$sm"
              className={styles.mb3}
            >
              {props.rewardCountdownData.title}
            </Text>
            <Text
              color="$text"
              fontWeight="$semibold"
              fontSize={{
                mobile: "$2xl",
                tablet: "$4xl",
                desktop: "$4xl",
              }}
              lineHeight="$normal"
            >
              {props.rewardCountdownData.hours}
              <Text
                className={styles.semocolon}
                as="span"
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize={{
                  mobile: "$2xl",
                  tablet: "$4xl",
                  desktop: "$4xl",
                }}
              >
                :
              </Text>
              {props.rewardCountdownData.minutes}
              <Text
                className={styles.semocolon}
                as="span"
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize={{
                  mobile: "$2xl",
                  tablet: "$4xl",
                  desktop: "$4xl",
                }}
              >
                :
              </Text>
              {props.rewardCountdownData.seconds}
            </Text>
          </Stack>
        </Box>

        <Box gridArea="c" className={styles.rewardBox}>
          <Stack
            direction="vertical"
            space="$0"
            attributes={{
              justifyContent: "center",
            }}
          >
            <Text
              color="$rewardContent"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize="$sm"
              className={styles.mb3}
            >
              {props.rewardData.title}
            </Text>
            <Stack
              space="$0"
              attributes={{
                alignItems: "flex-end",
              }}
            >
              <Text
                color="$rewardContent"
                fontSize="$4xl"
                fontWeight="$semibold"
              >
                {props.rewardData.rewardAmount}
              </Text>
              <Text
                className={styles.osom}
                color="$rewardContent"
                fontWeight="$semibold"
              >
                {props.rewardData.rewardTokenName}
              </Text>
              <Text color="$rewardContent" className={styles.mb3}>
                $
                {store.getState().formatNumber({
                  value: props.rewardData.rewardNotionalValue,
                })}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
