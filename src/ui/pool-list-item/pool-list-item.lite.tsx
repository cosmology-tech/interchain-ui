import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import Box from "../box";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import APR from "./apr.lite";
import CellWithTitle from "./cell-with-title.lite";

import { store } from "../../models/store";
import * as styles from "./pool-list-item.css";

import type { PoolListItemProps } from "./pool-list-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function PoolListItem(props: PoolListItemProps) {
  const state = useStore<{
    theme: ThemeVariant;
    apr: string;
    isInteractive: boolean;
  }>({
    theme: "light",
    get apr() {
      return new BigNumber(props?.apr || 0).decimalPlaces(2).toString();
    },
    get isInteractive() {
      return !!props.onClick && typeof props.onClick === "function";
    },
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
    <Box
      alignItems="center"
      className={clsx(styles.container, {
        [styles.hoverStyle]: !!props.onClick,
      })}
      attributes={{
        onClick: () => props?.onClick?.(),
      }}
    >
      <PoolName
        id={props.id}
        className={styles.nameContainer}
        coins={props.poolAssets}
      />

      <Box className={clsx(styles.responsiveText, styles.onlySm)}>
        <APR
          title="APR"
          className={styles.onlySm}
          apr={state.apr}
          innerClassName={styles.iconContainer[state.theme]}
        />
      </Box>

      <Box className={styles.onlySm} width="$full" height="$9" />

      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="Liquidity"
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store
            .getState()
            .formatNumber({ value: props?.liquidity, style: "currency" })}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="24H Volume"
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store
            .getState()
            .formatNumber({ value: props?.volume24H, style: "currency" })}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="7D Fees"
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store
            .getState()
            .formatNumber({ value: props?.fees7D, style: "currency" })}
        </Text>
      </CellWithTitle>
      {/* 14 day totalApr */}
      <APR
        className={clsx(styles.responsiveText, styles.lgAPR)}
        apr={state.apr}
        innerClassName={styles.iconContainer[state.theme]}
      />
      <Box className={styles.onlySm} width="$full" height="$4" />
    </Box>
  );
}
