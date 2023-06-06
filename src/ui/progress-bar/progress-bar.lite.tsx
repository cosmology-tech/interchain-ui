import {
  useMetadata,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
  useRef,
} from "@builder.io/mitosis";
import Box from "../box";
import * as styles from "./progress-bar.css";
import { ProgressBarProps } from "./progress-bar.types";

export default function ProgressBar(props: ProgressBarProps) {
  const state = useStore<{
    percent: number;
  }>({
    percent: 0,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  onMount(() => {
    state.percent = props.progress;
    inputRef.style.backgroundSize = `${props.progress}% 100%`;
  });
  onUpdate(() => {
    state.percent = props.progress;
    inputRef.style.backgroundSize = `${props.progress}% 100%`;
  }, [props.progress]);
  return (
    <Box aria-valuemax={100} aria-valuemin={0}>
      {/* <Box className={styles.bar}>
        <div
          className={styles.filledBar}
          style={{ width: `${props.progress}%` }}
        >
          <div
            onDrag={(e) => console.log("ondrag", e)}
            onClick={() => console.log("onclick")}
            className={styles.dot}
          />
        </div>
      </Box> */}
      <input
        className={styles.range}
        type="range"
        ref={inputRef}
        onChange={(e) => {
          let min = e.target.min;
          let max = e.target.max;
          let val = e.target.value;
          const result = ((val - min) * 100) / (max - min);
          e.target.style.backgroundSize = `${result}% 100%`;
          state.percent = result;
          console.log(e.target.value);
        }}
        min="0"
        max="100"
        value={state.percent}
      />
    </Box>
  );
}
