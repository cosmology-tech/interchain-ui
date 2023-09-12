import { useDefaultProps } from "@builder.io/mitosis";
import type { LinkCardProps } from "./link-card.types";
import * as styles from "./link-card.css";
import Box from "../box";
import Icon from "../icon";
import Text from "../text";

useDefaultProps<Partial<LinkCardProps>>({
  width: "360px",
  height: "210px",
  iconColor: "$text",
  openInNewTab: true,
});

export default function LinkCard(props: LinkCardProps) {
  return (
    <Box
      as="a"
      attributes={{
        href: props.url,
        target: props.openInNewTab ? "_blank" : "_self",
      }}
      maxWidth={props.width}
      height={props.height}
      borderRadius="$4xl"
      backgroundColor="$cardBg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      fontFamily="$body"
      className={styles.container}
    >
      <Icon
        size="$10xl"
        name={props.icon}
        color={props.iconColor}
        attributes={{ marginBottom: "$9" }}
      />
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        lineHeight="$normal"
        attributes={{ marginBottom: "$4" }}
      >
        {props.title}
      </Text>
      <Text
        color="$textSecondary"
        fontSize="$md"
        fontWeight="$normal"
        lineHeight="$short"
      >
        {props.description}
      </Text>
    </Box>
  );
}
