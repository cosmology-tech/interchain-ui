import * as React from "react";
import clx from "clsx";
import { useSliderState, SliderState } from "react-stately";

import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
  AriaSliderThumbProps,
  AriaSliderProps,
} from "react-aria";
import { meshThemeClass } from "@/styles/themes.css";
import Box from "@/ui/box";
import { BoxProps } from "@/ui/box/box.types";
import * as styles from "./slider.css";

export interface SliderProps extends AriaSliderProps {
  name: string;
  fluidWidth?: boolean;
  width?: BoxProps["width"];
  renderLabel?: ({
    labelProps,
    outputProps,
    valuePercent,
    valueLabel,
  }: {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
    outputProps: React.OutputHTMLAttributes<HTMLOutputElement>;
    valuePercent: number;
    valueLabel: string;
  }) => React.ReactNode;
  formatOptions?: Parameters<typeof useNumberFormatter>[0];
}

export default function Slider(props: SliderProps) {
  const trackRef = React.useRef(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  return (
    <Box
      width={props.fluidWidth ? "100%" : props.width ?? "auto"}
      minWidth={props.fluidWidth ? "unset" : "300px"}
      attributes={{
        ...groupProps,
      }}
      className={clx(
        meshThemeClass,
        styles.slider,
        state.orientation === "horizontal"
          ? styles.sliderHorizontal
          : styles.sliderVertical
      )}
    >
      {props.label && (
        <div className={styles.labelContainer}>
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        </div>
      )}

      {!props.label &&
        typeof props.renderLabel === "function" &&
        props.renderLabel({
          labelProps,
          outputProps,
          valuePercent: state.getThumbPercent(0),
          valueLabel: state.getThumbValueLabel(0),
        })}

      <div
        {...trackProps}
        ref={trackRef}
        className={clx(
          state.orientation === "horizontal"
            ? styles.horizontalTrack
            : styles.verticalTrack
        )}
        {...{
          "data-disabled": state.isDisabled ? "true" : "false",
        }}
      >
        <div
          className={styles.trackProgress}
          style={{
            width: `${state.getThumbPercent(0) * 100}%`,
          }}
        />

        <Thumb index={0} state={state} trackRef={trackRef} name={props.name} />
      </div>
    </Box>
  );
}

export interface SliderThumbProps extends AriaSliderThumbProps {
  state: SliderState;
  trackRef: React.RefObject<HTMLDivElement>;
  index: number;
}

function Thumb(props: SliderThumbProps) {
  const { state, trackRef, index, name } = props;
  const inputRef = React.useRef(null);
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={clx(styles.sliderThumb)}
      {...{
        "data-dragging": isDragging ? "true" : "false",
        "data-focused": isFocusVisible ? "true" : "false",
        "data-direction": state.orientation,
      }}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}
