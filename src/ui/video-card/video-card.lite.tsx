import Box from "../box";
import Text from "../text";
import * as styles from "./video-card.css";
import type { VideoCardProps } from "./video-card.types";

const DEFAULT_SIZE: VideoCardProps["size"] = "md";

export default function VideoCard(props: VideoCardProps) {
  return (
    <Box
      fontFamily="$body"
      className={styles.container[props.size || DEFAULT_SIZE]}
      attributes={{ onClick: () => props.onClick() }}
    >
      <Box
        as="img"
        attributes={{ src: props.thumbnail }}
        className={styles.thumbnail[props.size || DEFAULT_SIZE]}
        width="100%"
      />
      <Text
        attributes={{ marginTop: "$6" }}
        color="$text"
        fontWeight="$semibold"
        lineHeight="$normal"
        className={styles.title[props.size || DEFAULT_SIZE]}
      >
        {props.title}
      </Text>
      <Text
        attributes={{ marginTop: "$3" }}
        color="$textSecondary"
        fontWeight="$normal"
        lineHeight="$base"
        className={styles.duration[props.size || DEFAULT_SIZE]}
      >
        {props.duration}
      </Text>
    </Box>
  );
}
