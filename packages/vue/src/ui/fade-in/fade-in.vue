<template>
  <div ref="elementRef"><slot /></div>
</template>

<script lang="ts">
import anime from "animejs";
import { AnimeInstance } from "animejs";
import { FadeInProps } from "./fade-in.types";

export default {
  name: "fade-in",

  props: ["delayMs", "durationMs", "isVisible"],

  watch: {
    onUpdateHook0: {
      handler() {
        const delaySetting = props.delayMs || 100;
        const durationSetting = props.durationMs || 250;

        // Animation not init yet
        if (elementRef.value && !animationRef.value) {
          animationRef.value = anime({
            targets: elementRef.value,
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
          animationRef.value?.restart();
        } else {
          animationRef.value?.pause();
        }
      },
      immediate: true,
    },
  },
};
</script>