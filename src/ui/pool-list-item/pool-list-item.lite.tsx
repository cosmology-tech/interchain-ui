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
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import PoolName from "../pool/components/pool-name";
import APR from "./components/apr";
import CellWithTitle from "./components/cell-with-title";
import { store } from "../../models/store";
import * as styles from "./pool-list-item.css";
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

  return (
    <Stack align="center" className={styles.container}>
      <PoolName
        id={props.id}
        className={styles.nameContainer}
        token1={props.token1}
        token2={props.token2}
      />
      <CellWithTitle
        className={clsx(styles.responsiveText, styles.onlySm)}
        innerClassName={styles.onlySm}
        title="APR"
      >
        <APR
          className={styles.onlySm}
          apr={props.apr}
          innerClassName={styles.iconConntainer[state.theme]}
        />
      </CellWithTitle>
      <Box className={styles.onlySm} width="full" height="9" />
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="Liquidity"
      >
        <Text
          color="text"
          weight="semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "4",
          }}
        >
          ${props.poolLiquidity.toLocaleString()}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="24H Volume"
      >
        <Text
          color="text"
          weight="semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "4",
          }}
        >
          ${props.volume.toLocaleString()}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="7D Fees"
      >
        <Text
          color="text"
          weight="semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "4",
          }}
        >
          ${props.fees.toLocaleString()}
        </Text>
      </CellWithTitle>
      <APR
        className={clsx(styles.responsiveText, styles.lgAPR)}
        apr={props.apr}
        innerClassName={styles.iconConntainer[state.theme]}
      />
      <Box className={styles.onlySm} width="full" height="4" />
    </Stack>
  );
}
