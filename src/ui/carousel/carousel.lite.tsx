import {
  Show,
  For,
  useRef,
  useStore,
  onUpdate,
  useDefaultProps,
} from "@builder.io/mitosis";

import Box from "../box";
import ScrollIndicator from "../scroll-indicator";
import type { CarouselProps } from "./carousel.types";
import * as styles from "./carousel.css";

useDefaultProps<Partial<CarouselProps>>({
  gap: "20px",
  scrollOffset: 0,
  indicatorsMargin: "20px",
  noIndicatorsShadow: false,
});

const INDICATOR_HEIGHT = 40;

export default function Carousel(props: CarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const state = useStore({
    scrollLeft: 0,
    showLeftIndicator: true,
    showRightIndicator: true,
    get yOffset() {
      return (containerRef?.clientHeight || 0) / 2 - INDICATOR_HEIGHT / 2;
    },
    handleScroll(scrollDirection: "left" | "right") {
      if (!containerRef) return;
      const isScrollRight = scrollDirection === "right";
      const scrollDistance = containerRef.clientWidth - props.scrollOffset;
      const scrollValue = isScrollRight ? scrollDistance : -scrollDistance;
      const currentPosition = containerRef.scrollLeft + scrollValue;

      containerRef.scrollLeft = currentPosition;
      state.scrollLeft = currentPosition;
    },
  });

  onUpdate(() => {
    if (!containerRef) return;
    state.showLeftIndicator = state.scrollLeft > 0;
    state.showRightIndicator =
      state.scrollLeft + containerRef.clientWidth < containerRef.scrollWidth;
  }, [containerRef, state.scrollLeft]);

  return (
    <Box position="relative" width={props.width}>
      <Show when={state.showLeftIndicator}>
        <Box
          position="absolute"
          top={(props.indicatorsYOffset || state.yOffset) + "px"}
          left={props.indicatorsMargin}
          zIndex={100}
        >
          <ScrollIndicator
            direction="left"
            onClick={() => state.handleScroll("left")}
            noShadow={props.noIndicatorsShadow}
          />
        </Box>
      </Show>

      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="100%"
        overflow="hidden"
        gap={props.gap}
        ref={containerRef}
        className={styles.innerContainer}
      >
        <For each={props.children}>
          {(element: any) => (
            <Box flex="0 0 auto" key={element?.key}>
              {element}
            </Box>
          )}
        </For>
      </Box>

      <Show when={state.showRightIndicator}>
        <Box
          position="absolute"
          top={(props.indicatorsYOffset || state.yOffset) + "px"}
          right={props.indicatorsMargin}
          zIndex={100}
        >
          <ScrollIndicator
            direction="right"
            onClick={() => state.handleScroll("right")}
            noShadow={props.noIndicatorsShadow}
          />
        </Box>
      </Show>
    </Box>
  );
}
