import { onMount, onUpdate, useRef } from "@builder.io/mitosis";
import * as styles from "./progress-bar.css";
import { ProgressBarProps } from "./progress-bar.types";

export default function ProgressBar(props: ProgressBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  onMount(() => {
    inputRef.style.backgroundSize = `${props.progress}% 100%`;
  });
  onUpdate(() => {
    inputRef.style.backgroundSize = `${props.progress}% 100%`;
  }, [props.progress]);

  return (
    <div aria-valuemax={100} aria-valuemin={0}>
      <input
        className={styles.range}
        type="range"
        ref={inputRef}
        onChange={(e) => {
          let min = Number(e.target.min);
          let max = Number(e.target.max);
          let val = Number(e.target.value);
          const result = ((val - min) * 100) / (max - min);
          e.target.style.backgroundSize = `${result}% 100%`;
          props.onProgressChange(result);
        }}
        min="0"
        max="100"
        value={props.progress}
      />
    </div>
  );
}
