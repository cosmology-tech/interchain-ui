import {
  onUpdate,
  onMount,
  useRef,
  useDefaultProps,
  useStore,
  Show,
  onUnMount,
} from "@builder.io/mitosis";
import clsx from "clsx";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import debounce from "lodash/debounce";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import { store } from "../../models/store";
import type { ShowMoreProps } from "./show-more.types";
import * as styles from "./show-more.css";

export default function ShowMore(props: ShowMoreProps) {
  useDefaultProps({
    initialHeightPercent: 0.5,
    showMoreTitle: "Show more",
    showLessTitle: "Show less",
  });
  let eleHeight = useRef<number | null>(null);
  let initHeightRef = useRef<number | null>(0);
  let isVisibleRef = useRef<boolean>(false);
  let animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);
  const state = useStore({
    isVisible: false,
    toggle() {
      isVisibleRef = !state.isVisible;
      state.isVisible = !state.isVisible;
    },
    updateAnimationRef() {
      animationRef = anime({
        targets: elementRef,
        height: [eleHeight * initHeightRef, eleHeight],
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutExpo`,
      });
      state.isVisible = false;
    },
    theme: "",
  });
  let cleanupRef = useRef<() => void>(null);
  let resizeRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });

    // Listen the resize event to get container height
    resizeRef = debounce(() => {
      elementRef.style.height = "auto";
      eleHeight = elementRef.offsetHeight + 50;
      elementRef.style.height = isVisibleRef
        ? `${eleHeight}px`
        : `${eleHeight * initHeightRef}px`;
      state.updateAnimationRef();
    }, 300);
    window.addEventListener("resize", resizeRef);

    // Simulate useLayoutEffect
    setTimeout(() => {
      if (!eleHeight) {
        eleHeight = elementRef.offsetHeight + 50;
      }

      state.updateAnimationRef();
    }, 500);
  });

  onUpdate(() => {
    initHeightRef = props.initialHeightPercent;
    state.updateAnimationRef();
  }, [props.initialHeightPercent]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();

    if (window) {
      window.removeEventListener("resize", resizeRef);
    }
  });

  return (
    <div ref={elementRef} className={clsx(styles.container, props.className)}>
      {props.children}
      <Show when={!state.isVisible}>
        <Stack
          className={clsx(styles.moreBox, styles.shadow[state.theme])}
          attributes={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={() => {
              state.toggle();
              animationRef?.play();
            }}
            className={styles.btnContainer}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                marginRight: "$5",
              }}
            >
              {props.showMoreTitle}
            </Text>
            <Icon name="arrowDownS" color="$textSecondary" />
          </div>
        </Stack>
      </Show>
      <Show when={!!state.isVisible}>
        <Stack
          className={styles.moreBox}
          attributes={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={() => {
              state.toggle();
              animationRef?.reverse();
              animationRef?.play();
            }}
            className={styles.btnContainer}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                marginRight: "$5",
              }}
            >
              {props.showLessTitle}
            </Text>
            <Icon name="arrowUpS" color="$textSecondary" />
          </div>
        </Stack>
      </Show>
    </div>
  );
}
