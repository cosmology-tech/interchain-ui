import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pool-info-header.css";
import { PoolInfoHeaderProps } from "./pool-info-header.types";

export default function PoolsHeader(props: PoolInfoHeaderProps) {
  return (
    <Box className={styles.poolInfoHeader}>
      <Stack direction="vertical">
        <Text size="xl" weight="semibold">
          {props.token1.name} / {props.token2.name}
        </Text>
        <Text
          color="textSecondary"
          attributes={{
            marginTop: "3",
            marginBottom: "13",
          }}
        >
          Pool #{props.id}
        </Text>
      </Stack>
      <Stack
        attributes={{
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box className={styles.imageBox}>
          <img className={styles.image1} src={props.token1.imgSrc} />
          <img className={styles.image2} src={props.token2.imgSrc} />
        </Box>
        <Stack className={styles.longText} direction="vertical">
          <Text color="textSecondary">Pool liquidity</Text>
          <Stack
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text attributes={{ marginRight: "1" }}>$</Text>
            <Text size="4xl" weight="semibold">
              {store.getState()?.formatNumber?.({ value: props.poolLiquidity })}
            </Text>
          </Stack>
        </Stack>
        <Box className={styles.onlysm} width="full" height="8" />
        <Stack className={styles.shortText} direction="vertical">
          <Text color="textSecondary">Swap fee</Text>
          <Stack
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text size="4xl" weight="semibold">
              {props.swapFee}
            </Text>
            <Text>%</Text>
          </Stack>
        </Stack>
        <Stack className={styles.longText} direction="vertical">
          <Text color="textSecondary">24h trading volume</Text>
          <Stack
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text attributes={{ marginRight: "1" }}>$</Text>
            <Text size="4xl" weight="semibold">
              {store.getState()?.formatNumber?.({ value: props.volume24H })}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
