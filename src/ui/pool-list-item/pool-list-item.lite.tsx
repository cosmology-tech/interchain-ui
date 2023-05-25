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
import Icon from "../icon";
import PoolName from "../pool/components/pool-name";
import { store } from "../../models/store";
import * as styles from "./pool-list-item.css";
import { themeVars } from "../../styles/themes.css";
import { BaseComponentProps } from "../../models/components.model";
import { PoolListItemProps } from "./pool-list-item.types";

export default function PoolListItem(props: PoolListItemProps) {
  const state = useStore({
    theme: "",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });
  // image
  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
  //         "theme": {
  //           "primary_color_hex": "#5c09a0"
  //         }

  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",

  function APR(aprProps: { className?: string }) {
    return (
      <Stack
        className={aprProps.className}
        justify="space-between"
        align="center"
      >
        <Text color="content" weight="semibold" marginRight="4">
          {props.apr}%
        </Text>
        <Stack
          className={styles.iconConntainer[state.theme]}
          justify="center"
          align="center"
        >
          <Icon name="verticalMore" color="content" />
        </Stack>
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
          color="tip"
          className={clsx(styles.onlySm, sprinkles({ marginBottom: "2" }))}
          wordBreak="break-word"
          marginRight="4"
        >
          {props.title}
        </Text>
        {props.children}
      </Stack>
    );
  }

  return (
    <Stack align="center" className={styles.container}>
      {/* <Box className={styles.imageBox}>
        <img className={styles.image1} src={props.token1.imgSrc} />
        <img className={styles.image2} src={props.token2.imgSrc} />
      </Box>
      <Stack
        className={clsx(styles.responsiveText, styles.rank)}
        direction="column"
        justify="center"
      >
        <Text
          color="content"
          weight="semibold"
          className={sprinkles({ marginBottom: "2" })}
        >
          {props.token1.name}/{props.token2.name}
        </Text>
        <Text color="tip">Pool #1</Text>
      </Stack> */}
      <PoolName
        className={styles.nameContainer}
        token1={props.token1}
        token2={props.token2}
      />
      <CellWithTitle className={styles.onlySm} title="APR">
        <APR className={styles.onlySm} />
      </CellWithTitle>
      <Box className={styles.onlySm} width="full" height="9" />
      <CellWithTitle title="Liquidity">
        <Text
          // className={styles.responsiveText}
          color="content"
          weight="semibold"
          wordBreak="break-word"
          marginRight="4"
        >
          ${props.poolLiquidity.toLocaleString()}
        </Text>
      </CellWithTitle>
      <CellWithTitle title="24H Volume">
        <Text
          // className={styles.responsiveText}
          color="content"
          weight="semibold"
          wordBreak="break-word"
          marginRight="4"
        >
          ${props.volume.toLocaleString()}
        </Text>
      </CellWithTitle>
      <CellWithTitle title="7D Fees">
        <Text
          // className={styles.responsiveText}
          color="content"
          weight="semibold"
          wordBreak="break-word"
          marginRight="4"
        >
          ${props.fees.toLocaleString()}
        </Text>
      </CellWithTitle>
      <APR className={clsx(styles.responsiveText, styles.lgAPR)} />
      <Box className={styles.onlySm} width="full" height="4" />
      {/* <Stack className={clsx(styles.responsiveText, styles.lgAPR)} justify="space-between">
          <Text color="content" weight="semibold">24%</Text>
          <Text className={styles.responsiveText} color="content" weight="semibold">...</Text>
        </Stack> */}
      {/* </Stack> */}
    </Stack>
  );
}
