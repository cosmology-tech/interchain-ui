import {
  useMetadata,
  onMount,
  useRef,
  useDefaultProps,
  useStore,
  onUnMount,
} from "@builder.io/mitosis";
import clsx from "clsx";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import debounce from "lodash/debounce";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { store } from "../../models/store";
import type { RevealProps } from "./reveal.types";
import * as styles from "./reveal.css";
import { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<RevealProps>>({
  hideThresholdHeight: 500,
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
});

export default function Reveal(props: RevealProps) {
  let eleHeight = useRef<number | null>(null);
  let isVisibleRef = useRef<boolean>(false);
  let animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);

  const state = useStore<{
    isVisible: boolean;
    toggle: () => void;
    updateAnimationRef: () => void;
    theme: ThemeVariant;
  }>({
    theme: "light",
    isVisible: false,
    toggle() {
      isVisibleRef = !state.isVisible;
      state.isVisible = !state.isVisible;
    },
    updateAnimationRef() {
      animationRef = anime({
        targets: elementRef,
        height: [props.hideThresholdHeight, eleHeight],
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
      state.isVisible = false;
    },
  });

  let cleanupRef = useRef<() => void>(null);
  let resizeListenerRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });

    setTimeout(() => {
      if (!elementRef) return;

      const TOGGLE_SPACE = 40;

      if (elementRef.offsetHeight > props.hideThresholdHeight) {
        // Listen the resize event to get container height
        resizeListenerRef = debounce(() => {
          elementRef.style.height = "auto";
          eleHeight = elementRef.offsetHeight + TOGGLE_SPACE;
          elementRef.style.height = isVisibleRef
            ? `${eleHeight}px`
            : `${props.hideThresholdHeight}px`;
          state.updateAnimationRef();
        }, 100);

        window.addEventListener("resize", resizeListenerRef);

        // Simulate useLayoutEffect
        setTimeout(() => {
          if (!eleHeight) {
            eleHeight = elementRef.offsetHeight + TOGGLE_SPACE;
          }
          state.updateAnimationRef();
        }, 100);
      }
    }, 100);
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();

    if (window) {
      window.removeEventListener("resize", resizeListenerRef);
    }
  });

  return (
    <div ref={elementRef} className={clsx(styles.container, props.className)}>
      {props.children}

      <Stack
        direction="vertical"
        attributes={{
          display: !state.isVisible ? "flex" : "none",
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "$full",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "$27",
        }}
      >
        {/* Shadow bg */}
        <Box
          height="$23"
          flexShrink="0"
          width="$full"
          className={styles.shadow[state.theme]}
        />

        <Box
          width="$full"
          display="flex"
          alignItems="center"
          backgroundColor={state.theme === "light" ? "$white" : "$gray900"}
          justifyContent="center"
          flex="1"
          attributes={{
            onClick: () => {
              state.toggle();
              animationRef?.play();
            },
            "data-part-id": "reveal-showmore",
          }}
        >
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              marginRight: "$5",
            }}
          >
            {props.showMoreLabel}
          </Text>
          <Icon name="arrowDownS" color="$textSecondary" />
        </Box>
      </Stack>

      <Stack
        attributes={{
          display: !!state.isVisible ? "flex" : "none",
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "fit-content",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          attributes={{
            onClick: () => {
              state.toggle();
              animationRef?.reverse();
              animationRef?.play();
            },
            "data-part-id": "reveal-showless",
          }}
        >
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              marginRight: "$5",
            }}
          >
            {props.showLessLabel}
          </Text>

          <Icon name="arrowUpS" color="$textSecondary" />
        </Box>
      </Stack>
    </div>
  );
}
