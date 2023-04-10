import { onUpdate, useRef } from "@builder.io/mitosis";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import type { FadeInProps } from "./fade-in.types";

export default function FadeIn(props: FadeInProps) {
  let animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);

  onUpdate(() => {
    const delaySetting = props.delayMs || 100;
    const durationSetting = props.durationMs || 250;

    // Animation not init yet
    if (elementRef && !animationRef) {
      animationRef = anime({
        targets: elementRef,
        opacity: [0, 1],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    }

    if (props.isVisible) {
      animationRef?.restart();
    } else {
      animationRef?.pause();
    }
  }, [props.delayMs, props.durationMs, props.isVisible]);

  return <div ref={elementRef}>{props.children}</div>;
}
