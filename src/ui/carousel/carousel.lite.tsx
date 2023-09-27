import {
  Show,
  For,
  useStore,
  onUpdate,
  useDefaultProps,
} from "@builder.io/mitosis";

import Box from "../box";
import ScrollIndicator from "../scroll-indicator";
import { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { CarouselProps } from "./carousel.types";
import * as styles from "./carousel.css";

useDefaultProps<Partial<CarouselProps>>({
  gap: "20px",
  width: "100%",
  scrollOffset: 0,
  indicatorsXOffset: 20,
  showIndicatorsShadow: true,
  verticalAlign: "start",
  initialPosition: 0,
  showIndicators: true,
  showFadeOut: false,
  fadeOutWidth: 156,
});

const INDICATOR_HEIGHT = 40;

const VERTICAL_ALIGN: Record<
  CarouselProps["verticalAlign"],
  Sprinkles["alignItems"]
> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

export default function Carousel(props: CarouselProps) {
  const state = useStore({
    scrollLeft: 0,
    showLeftIndicator: true,
    showRightIndicator: true,
    containerHeight: 0,
    containerRef: null,
    calcYOffset(_containerHeight: number, indicatorHeight: number) {
      return _containerHeight / 2 - indicatorHeight / 2;
    },
    assignRef(ref: HTMLElement) {
      state.containerRef = ref;
    },
    handleScroll(scrollDirection: "left" | "right") {
      if (!state.containerRef) return;
      const isScrollRight = scrollDirection === "right";
      const scrollDistance =
        state.containerRef.clientWidth - props.scrollOffset;
      const scrollValue = isScrollRight ? scrollDistance : -scrollDistance;
      const newPosition = state.containerRef.scrollLeft + scrollValue;

      state.scrollLeft = newPosition;
      state.containerRef.scrollLeft = newPosition;
    },
  });

  onUpdate(() => {
    if (!state.containerRef) return;

    setTimeout(() => {
      state.scrollLeft = props.initialPosition;
      state.containerHeight = state.containerRef.offsetHeight;
      state.containerRef.scrollLeft = props.initialPosition;
    }, 100);
  }, [state.containerRef]);

  onUpdate(() => {
    if (!state.containerRef || !state.containerHeight) return;

    state.showLeftIndicator = state.scrollLeft > 0;
    state.showRightIndicator =
      state.scrollLeft + state.containerRef.clientWidth <
      state.containerRef.scrollWidth;
  }, [state.containerRef, state.scrollLeft, state.containerHeight]);

  return (
    <Box position="relative" width={props.width}>
      <Show when={props.showIndicators && state.showLeftIndicator}>
        <Box
          position="absolute"
          top={`${
            props.indicatorsYOffset ||
            state.calcYOffset(state.containerHeight, INDICATOR_HEIGHT)
          }px`}
          left={`${props.indicatorsXOffset}px`}
          zIndex="$100"
        >
          <ScrollIndicator
            direction="left"
            onClick={() => state.handleScroll("left")}
            showShadow={props.showIndicatorsShadow}
          />
        </Box>
      </Show>

      <Show when={props.showFadeOut}>
        <Box
          width={`${props.fadeOutWidth}px`}
          height={`${state.containerHeight}px`}
          zIndex="$50"
          className={styles.fadeOutGradient}
          position="absolute"
          left={0}
          top={0}
        />
      </Show>

      <Box
        display="flex"
        alignItems={VERTICAL_ALIGN[props.verticalAlign]}
        width="100%"
        height="100%"
        overflow="hidden"
        gap={props.gap}
        ref={state.assignRef}
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

      <Show when={props.showFadeOut}>
        <Box
          width={`${props.fadeOutWidth}px`}
          height={`${state.containerHeight}px`}
          transform="rotate(180deg)"
          zIndex="$50"
          className={styles.fadeOutGradient}
          position="absolute"
          right={0}
          top={0}
        />
      </Show>

      <Show when={props.showIndicators && state.showRightIndicator}>
        <Box
          position="absolute"
          top={`${
            props.indicatorsYOffset ||
            state.calcYOffset(state.containerHeight, INDICATOR_HEIGHT)
          }px`}
          right={`${props.indicatorsXOffset}px`}
          zIndex="$100"
        >
          <ScrollIndicator
            direction="right"
            onClick={() => state.handleScroll("right")}
            showShadow={props.showIndicatorsShadow}
          />
        </Box>
      </Show>
    </Box>
  );
}
