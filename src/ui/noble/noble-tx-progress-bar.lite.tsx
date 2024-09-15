import {
  useRef,
  useStore,
  useMetadata,
  useDefaultProps,
  onMount,
  onUpdate,
  onUnMount,
} from "@builder.io/mitosis";
import { debounce } from "lodash";

import Box from "../box";
import { NobleTxProgressBarProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NobleTxProgressBarProps>>({
  width: "$full",
  mx: "$0",
  mt: "$0",
  mb: "$0",
});

export default function NobleTxProgressBar(props: NobleTxProgressBarProps) {
  let resizeHandlerRef = useRef<() => void>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);

  const state = useStore({
    trackWidth: 0,
    barWidth: 0,
    calcBarWidth() {
      const MAX_PROGRESS = 100;
      const MIN_PROGRESS = 0;
      const progress = Math.min(
        Math.max(props.progress, MIN_PROGRESS),
        MAX_PROGRESS,
      );
      return (progress / MAX_PROGRESS) * state.trackWidth;
    },
  });

  onMount(() => {
    resizeHandlerRef = debounce(() => {
      if (!progressTrackRef) return;
      state.trackWidth = progressTrackRef.clientWidth;
    }, 100);

    window.addEventListener("resize", resizeHandlerRef);

    resizeHandlerRef();
  });

  onUpdate(() => {
    state.barWidth = state.calcBarWidth();
  }, [state.trackWidth, props.progress]);

  onUnMount(() => {
    if (window) {
      window.removeEventListener("resize", resizeHandlerRef);
    }
  });

  return (
    <Box
      width={props.width}
      mx={props.mx}
      mt={props.mt}
      mb={props.mb}
      height="$6"
      borderRadius="$md"
      bg="$progressBg"
      position="relative"
      ref={progressTrackRef}
    >
      <Box
        width={`${state.barWidth}px`}
        height="$full"
        transition="width 0.3s ease-out"
        bg="$progressValue"
        borderRadius="$md"
        position="absolute"
        left="0"
        top="0"
      />
    </Box>
  );
}
