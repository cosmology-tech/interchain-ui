import {
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
} from "@builder.io/mitosis";
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
    const _strokeWidth = 4;
    const _radius = props.width / 2;
    const _circumference = _radius * 2 * Math.PI;
    const _offset = _circumference - (props.progress / 100) * _circumference;

    state.strokeWidth = _strokeWidth;
    state.radius = _radius;
    state.circumference = _circumference;
    state.offset = _offset;
  });

  onUpdate(() => {
    const updatedOffset =
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
          stroke-width={state.strokeWidth}
        />

        <circle
          className={styles.filledCircle}
          cx="50"
          cy="50"
          data-testid="progress-bar-bar"
          r={state.radius}
          stroke-dasharray={`${state.circumference} ${state.circumference}`}
          stroke-dashoffset={state.offset}
          stroke-width={state.strokeWidth}
        />
      </svg>
      <Stack
        className={styles.percentText}
        attributes={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text fontSize="$lg" fontWeight="$semibold">
          {props.progress}%
        </Text>
      </Stack>
    </div>
  );
}
