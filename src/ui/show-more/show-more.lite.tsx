import {
  onUpdate,
  onInit,
  onMount,
  useRef,
  useDefaultProps,
  useStore,
  Show,
} from "@builder.io/mitosis";
import clsx from "clsx";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import FadeIn from "../fade-in";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import type { ShowMoreProps } from "./show-more.types";
import * as styles from "./show-more.css";

export default function ShowMore(props: ShowMoreProps) {
  useDefaultProps({
    initialHeightPercent: 0.5,
    showMoreTitle: "Show more",
    showLessTitle: "Show less",
  });
  let eleHeight = useRef<number | null>(null);
  let animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);
  const state = useStore({
    isVisible: false,
    toggle() {
      state.isVisible = !state.isVisible;
    },
  });

  // onUpdate(() => {

  //   console.log("onUpdate before===", elementRef, elementRef.offsetHeight, elementRef.height)
  // })

  onMount(() => {
    // Simulate useLayoutEffect
    setTimeout(() => {
      if (!eleHeight) {
        eleHeight = elementRef.offsetHeight;
        console.log("elementRef clie===", eleHeight);
      }
      animationRef = anime({
        targets: elementRef,
        height: [eleHeight * props.initialHeightPercent, eleHeight],
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutExpo`,
      });
      console.log("animationRef====", animationRef);
    }, 500);
  });

  onUpdate(() => {
    // console.log('initialHeightPercent change', props.initialHeightPercent)
    animationRef = anime({
      targets: elementRef,
      height: [eleHeight * props.initialHeightPercent, eleHeight],
      duration: 250,
      direction: `alternate`,
      loop: false,
      autoplay: false,
      easing: `easeInOutExpo`,
    });
  }, [props.initialHeightPercent]);

  return (
    <div
      ref={elementRef}
      className={styles.container}
    >
      {props.children}
      <Show when={!state.isVisible}>
        <Stack
          className={clsx(styles.moreBox, styles.shadow)}
          justify="center"
          align="flex-end"
        >
          <div
            onClick={() => {
              animationRef?.play();
              state.toggle();
            }}
            className={styles.btnContainer}
          >
            <Text color="tip" weight="semibold" marginRight="5">
              {props.showMoreTitle}
            </Text>
            <Icon name="arrowDownS" color="tip" />
          </div>
        </Stack>
      </Show>
      <Show when={!!state.isVisible}>
        <Stack className={styles.moreBox} justify="center" align="flex-end">
          <div
            onClick={() => {
              animationRef?.reverse();
              animationRef?.play();
              state.toggle();
            }}
            className={styles.btnContainer}
          >
            <Text color="tip" weight="semibold" marginRight="5">
              {props.showLessTitle}
            </Text>
            <Icon name="arrowUpS" color="tip" />
          </div>
        </Stack>
      </Show>
    </div>
  );
}
