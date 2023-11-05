import {
  useMetadata,
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
import { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ShowMore(props: ShowMoreProps) {
  useDefaultProps({
    heightToShowMore: 500,
    showMoreTitle: "Show more",
    showLessTitle: "Show less",
  });
  let eleHeight = useRef<number | null>(null);
  let isVisibleRef = useRef<boolean>(false);
  let animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);
  const state = useStore<{
    isVisible: boolean;
    showToggle: boolean;
    toggle: () => void;
    updateAnimationRef: () => void;
    theme: ThemeVariant;
  }>({
    isVisible: false,
    showToggle: false,
    toggle() {
      isVisibleRef = !state.isVisible;
      state.isVisible = !state.isVisible;
    },
    updateAnimationRef() {
      animationRef = anime({
        targets: elementRef,
        height: [props.heightToShowMore, eleHeight],
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutExpo`,
      });
      state.isVisible = false;
    },
    theme: "light",
  });
  let cleanupRef = useRef<() => void>(null);
  let resizeRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });

    setTimeout(() => {
      if (elementRef.offsetHeight > props.heightToShowMore) {
        state.showToggle = true;

        // Listen the resize event to get container height
        resizeRef = debounce(() => {
          elementRef.style.height = "auto";
          eleHeight = elementRef.offsetHeight + 50;
          elementRef.style.height = isVisibleRef
            ? `${eleHeight}px`
            : `${props.heightToShowMore}px`;
          state.updateAnimationRef();
        }, 100);
        window.addEventListener("resize", resizeRef);

        // Simulate useLayoutEffect
        setTimeout(() => {
          if (!eleHeight) {
            eleHeight = elementRef.offsetHeight + 50;
          }

          state.updateAnimationRef();
        }, 0);
      } else {
        state.showToggle = false;
      }
    }, 100);
  });

  // onUpdate(() => {
  //   if (state.showToggle) {
  //     state.updateAnimationRef();
  //   }
  // }, [state.showToggle, props.heightToShowMore]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();

    if (window) {
      window.removeEventListener("resize", resizeRef);
    }
  });

  return (
    <div ref={elementRef} className={clsx(styles.container, props.className)}>
      {props.children}
      <Show when={!state.isVisible && state.showToggle}>
        <Stack
          className={clsx(styles.moreBox, styles.shadow[state.theme])}
          attributes={{
            justifyContent: "center",
            alignItems: "flex-end",
            height: "$22",
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
      <Show when={!!state.isVisible && state.showToggle}>
        <Stack
          className={styles.moreBox}
          attributes={{
            justifyContent: "center",
            alignItems: "flex-end",
            height: "fit-content",
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
