import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Box from "../box";
import CicularProgressBar from "../circular-progress-bar";
import * as styles from "./token-input.css";

import { TokenInputProps } from "./token-input.types";

export function TokenInput(props: TokenInputProps) {
  return (
    <Stack flexWrap="wrap">
      <Stack
        attributes={{
          width: "full",
        }}
      >
        <Text>Available&nbsp;</Text>
        <Text>
          {props.available}&nbsp;{props.symbol}
        </Text>
      </Stack>
      <CicularProgressBar progress={props.progress} />
      <Stack direction="column">
        <Text>{props.symbol}</Text>
        <Text>{props.denom}</Text>
      </Stack>
      <Icon name="add" />
      <Stack className={styles.inputBox}>
        <Stack className={styles.imgBox} justify="center" align="center">
          <img className={styles.img} src={props.imgSrc} />
        </Stack>
        <input />
      </Stack>
    </Stack>
  );
}
