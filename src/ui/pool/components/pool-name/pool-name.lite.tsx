import Stack from "../../../stack";
import Box from "../../../box";
import Text from "../../../text";
import { PoolNameProps } from "./pool-name.types";
import * as styles from "./pool-name.css";

export default function PoolName(props: PoolNameProps) {
  return (
    <Stack
      className={props.className}
      space="0"
      attributes={{ alignItems: "center" }}
    >
      <Box className={styles.imageBox}>
        <img className={styles.image1} src={props.token1.imgSrc} />
        <img className={styles.image2} src={props.token2.imgSrc} />
      </Box>
      {/* <Stack className={styles.contentContainer} align="center"> */}
      <Stack
        className={styles.nameContainer}
        direction="vertical"
        space="0"
        attributes={{
          justifyContent: "center",
          paddingLeft: "8",
        }}
      >
        <Text
          color="text"
          weight="semibold"
          attributes={{
            marginBottom: "2",
          }}
        >
          {props.token1.name}/{props.token2.name}
        </Text>
        <Text color="textSecondary">Pool #{props.id}</Text>
      </Stack>
    </Stack>
  );
}
