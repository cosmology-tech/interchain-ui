import {
  useMetadata,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
  useRef,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import * as styles from "./circular-progress-bar.css";
import { CircularProgressBarProps } from "./circular-progress-bar.types";

export default function CicularProgressBar(props: CircularProgressBarProps) {
  useDefaultProps({
    width: 80,
  });
  const state = useStore({
    strokeWidth: 0,
    radius: 0,
    circumference: 0,
    offset: 0,
  });

  onMount(() => {
    let strokeWidth = 4;
    let radius = props.width / 2;
    let circumference = radius * 2 * Math.PI;
    let offset = circumference - (props.progress / 100) * circumference;
    state.strokeWidth = strokeWidth;
    state.radius = radius;
    state.circumference = circumference;
    state.offset = offset;
  });
  onUpdate(() => {
    let updatedOffset =
      state.circumference - (props.progress / 100) * state.circumference;
      state.offset = updatedOffset;
  }, [props.progress, state.circumference]);
  return (
    <div
      className={styles.container}
      style={{ width: `${props.width}px`, height: `${props.width}px` }}
    >
      <svg
        aria-valuemax={100}
        aria-valuemin={0}
        height={props.width}
        role="progressbar"
        width={props.width}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.circle}
          cx="50"
          cy="50"
          r={state.radius}
          strokeWidth={state.strokeWidth}
        />

        <circle
          className={styles.filledCircle}
          cx="50"
          cy="50"
          data-testid="progress-bar-bar"
          r={state.radius}
          strokeDasharray={`${state.circumference} ${state.circumference}`}
          strokeDashoffset={state.offset}
          strokeWidth={state.strokeWidth}
        />
      </svg>
      <Stack className={styles.percentText} align="center" justify="center">
        <Text size="lg" weight="semibold">
          {props.progress}%
        </Text>
      </Stack>
    </div>
  );
}
