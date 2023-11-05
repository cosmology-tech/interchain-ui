import { onUpdate, useRef, useMetadata } from "@builder.io/mitosis";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import type { FadeInProps } from "./fade-in.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function FadeIn(props: FadeInProps) {
  let fadeInAnimationRef = useRef<AnimeInstance | null>(null);
  let fadeOutAnimationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);

  onUpdate(() => {
    const delaySetting = props.delayMs || 100;
    const durationSetting = props.durationMs || 250;

    // Animation not init yet
    if (elementRef && !fadeInAnimationRef && !fadeOutAnimationRef) {
      fadeInAnimationRef = anime({
        targets: elementRef,
        opacity: [0, 1],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: "spring(1, 80, 10, 0)",
      });

      fadeOutAnimationRef = anime({
        targets: elementRef,
        opacity: [1, 0],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: "spring(1, 80, 10, 0)",
      });
    }

    if (props.isVisible) {
      fadeInAnimationRef?.restart();
    } else {
      fadeOutAnimationRef?.restart();
    }
  }, [props.delayMs, props.durationMs, props.isVisible]);

  return <div ref={elementRef}>{props.children}</div>;
}
