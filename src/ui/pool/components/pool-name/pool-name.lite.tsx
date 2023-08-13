import { useStore} from "@builder.io/mitosis";
import Stack from "../../../stack";
import Box from "../../../box";
import Text from "../../../text";
import { PoolNameProps } from "./pool-name.types";
import * as styles from "./pool-name.css";

export default function PoolName(props: PoolNameProps) {
  return (
    <Stack
      className={props.className}
      space="$0"
      attributes={{ alignItems: "center" }}
    >
      <Box className={styles.imageBox}>
        <img className={styles.image1} src={props?.coins[0]?.imgSrc} />
        <img className={styles.image2} src={props?.coins[1]?.imgSrc} />
      </Box>
      <Stack
        className={styles.nameContainer}
        direction="vertical"
        space="$0"
        attributes={{
          justifyContent: "center",
          paddingLeft: "$8",
        }}
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          attributes={{
            marginBottom: "$2",
          }}
        >
          {`${props.coins[0]?.symbol} / ${props.coins[1].symbol}`}
        </Text>
        <Text color="$textSecondary">Pool #{props.id}</Text>
      </Stack>
    </Stack>
  );
}
