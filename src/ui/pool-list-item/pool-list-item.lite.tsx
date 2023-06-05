import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import clsx from "clsx";
import { sprinkles } from "../../styles/sprinkles.css";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pool-list-item.css";
import { themeVars } from "../../styles/themes.css";
import { BaseComponentProps } from "../../models/components.model";

export default function PoolListItem(props) {
  // image
  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
  //         "theme": {
  //           "primary_color_hex": "#5c09a0"
  //         }

  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",

  function APR(props: { className?: string }) {
    return (
      <Stack className={props.className} justify="space-between">
        <Text color="text" weight="semibold">
          24%
        </Text>
        <Text color="text" weight="semibold">
          ...
        </Text>
      </Stack>
    );
  }

  function CellWithTitle(props: {
    title: string;
    className?: string;
    children: BaseComponentProps["children"];
  }) {
    return (
      <Stack
        className={clsx(styles.responsiveText, props.className)}
        direction="column"
        justify="center"
      >
        <Text
          color="textSecondary"
          className={clsx(styles.onlySm, sprinkles({ marginBottom: "2" }))}
        >
          {props.title}
        </Text>
        {props.children}
      </Stack>
    );
  }

  return (
    <Stack align="center" className={styles.container}>
      <Box className={styles.imageBox}>
        <img
          className={styles.image1}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg"
        />
        <img
          className={styles.image2}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
        />
      </Box>
      {/* <Stack className={styles.contentContainer} align="center"> */}
      <Stack
        className={clsx(styles.responsiveText, styles.rank)}
        direction="column"
        justify="center"
      >
        <Text
          color="text"
          weight="semibold"
          className={sprinkles({ marginBottom: "2" })}
        >
          ATOM/OSMO
        </Text>
        <Text color="textSecondary">Pool #1</Text>
      </Stack>
      <CellWithTitle className={styles.onlySm} title="APR">
        <APR />
      </CellWithTitle>
      <Box className={styles.onlySm} width="full" height="9" />
      <CellWithTitle title="24H Volume">
        <Text className={styles.responsiveText} color="text" weight="semibold">
          $168,767,639
        </Text>
      </CellWithTitle>
      <CellWithTitle title="7D Fees">
        <Text className={styles.responsiveText} color="text" weight="semibold">
          $3,288,612
        </Text>
      </CellWithTitle>
      <CellWithTitle title="Liquidity">
        <Text className={styles.responsiveText} color="text" weight="semibold">
          $59,075
        </Text>
      </CellWithTitle>
      <APR className={clsx(styles.responsiveText, styles.lgAPR)} />
      <Box className={styles.onlySm} width="full" height="4" />
      {/* <Stack className={clsx(styles.responsiveText, styles.lgAPR)} justify="space-between">
          <Text color="text" weight="semibold">24%</Text>
          <Text className={styles.responsiveText} color="text" weight="semibold">...</Text>
        </Stack> */}
      {/* </Stack> */}
    </Stack>
  );
}
