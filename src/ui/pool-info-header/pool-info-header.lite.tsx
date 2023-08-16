import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pool-info-header.css";
import { PoolInfoHeaderProps } from "./pool-info-header.types";

export default function PoolsHeader(props: PoolInfoHeaderProps) {
  return (
    <Box className={styles.poolInfoHeader}>
      <Stack direction="vertical" space="$0">
        {/* <Text fontSize="$xl" fontWeight="$semibold">
          {`${props.coins[0]?.symbol} / ${props.coins[1]?.symbol}`}
        </Text> */}
        <Text
          color="$textSecondary"
          attributes={{
            marginTop: "$3",
            marginBottom: "$13",
          }}
        >
          Pool #{props.id}
        </Text>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box className={styles.imageBox}>
          <img className={styles.image1} src={props.coins[0]?.imgSrc} />
          <img className={styles.image2} src={props.coins[1]?.imgSrc} />
        </Box>
        <Stack space="$0" className={styles.longText} direction="vertical">
          <Text color="$textSecondary">Pool liquidity</Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text attributes={{ marginRight: "$1" }}>$</Text>
            <Text fontSize="$4xl" fontWeight="$semibold">
              {store.getState()?.formatNumber?.({ value: props.liquidity })}
            </Text>
          </Stack>
        </Stack>

        <Box className={styles.onlysm} width="$full" height="$8" />

        <Stack className={styles.shortText} direction="vertical" space="$0">
          <Text color="$textSecondary">Swap fee</Text>
          <Stack
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text fontSize="$4xl" fontWeight="$semibold">
              {props.swapFee}
            </Text>
            <Text>%</Text>
          </Stack>
        </Stack>

        <Stack className={styles.longText} direction="vertical" space="$0">
          <Text color="$textSecondary">24h trading volume</Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text attributes={{ marginRight: "$1" }}>$</Text>
            <Text fontSize="$4xl" fontWeight="$semibold">
              {store.getState()?.formatNumber?.({ value: props.volume24H })}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
