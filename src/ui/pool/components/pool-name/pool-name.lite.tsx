import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { sprinkles } from "../../../../styles/sprinkles.css";
import clsx from "clsx";
import Stack from "../../../stack";
import Box from "../../../box";
import Text from "../../../text";
import { PoolNameProps } from "./pool-name.types";
import * as styles from './pool-name.css'

export default function PoolName(props: PoolNameProps) {
  return (
    <Stack className={props.className}>
      <Box className={styles.imageBox}>
        <img className={styles.image1} src={props.token1.imgSrc} />
        <img className={styles.image2} src={props.token2.imgSrc} />
      </Box>
      {/* <Stack className={styles.contentContainer} align="center"> */}
      <Stack
        direction="column"
        justify="center"
      >
        <Text
          color="text"
          weight="semibold"
          className={sprinkles({ marginBottom: "2" })}
        >
          {props.token1.name}/{props.token2.name}
        </Text>
        <Text color="textSecondary">Pool #1</Text>
      </Stack>
    </Stack>
  );
}
