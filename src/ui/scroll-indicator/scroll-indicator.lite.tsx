import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Icon from "../icon";
import * as styles from "./scroll-indicator.css";
import { ScrollIndicatorProps } from "./scroll-indicator.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ScrollIndicatorProps>>({
  showShadow: true,
});

export default function ScrollIndicator(props: ScrollIndicatorProps) {
  return (
    <Box
      width="$14"
      height="$14"
      backgroundColor="$white"
      borderRadius="$full"
      attributes={{ onClick: () => props.onClick() }}
      display="grid"
      placeItems="center"
      className={clx(styles.indicator, props.showShadow ? styles.shadow : null)}
      transform={`rotate(${props.direction === "left" ? 180 : 0}deg)`}
    >
      <Icon
        size="$md"
        name="arrowRightRounded"
        attributes={{ transform: "translateX(1px)" }}
      />
    </Box>
  );
}
