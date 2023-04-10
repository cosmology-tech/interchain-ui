import * as React from "react";
import { useRef, useEffect } from "react";
import anime from "animejs";
import { AnimeInstance } from "animejs";
import { FadeInProps } from "./fade-in.types";

function FadeIn(props: FadeInProps) {
  const animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const delaySetting = props.delayMs || 100;
    const durationSetting = props.durationMs || 250;

    // Animation not init yet
    if (elementRef.current && !animationRef.current) {
      animationRef.current = anime({
        targets: elementRef.current,
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
      animationRef.current?.restart();
    } else {
      animationRef.current?.pause();
    }
  }, [props.delayMs, props.durationMs, props.isVisible]);

  return <div ref={elementRef}>{props.children}</div>;
}

export default FadeIn;
