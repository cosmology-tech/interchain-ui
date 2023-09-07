import {
  useMetadata,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
} from "@builder.io/mitosis";
import clsx from "clsx";
import omit from "lodash/omit";
import { rainbowSprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BoxProps } from "./box.types";
import { DEFAULT_VALUES } from "./box.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Box(props: BoxProps) {
  useDefaultProps({
    as: DEFAULT_VALUES.as,
  });

  const state = useStore<{
    style: Record<string, unknown>;
    passThroughProps: Record<string, unknown>;
    className: string;
    calculateStyles: () => void;
    _passThroughProps: Record<string, unknown>;
  }>({
    className: "",
    style: {},
    passThroughProps: {},
    get _passThroughProps() {
      return state.passThroughProps;
    },
    calculateStyles() {
      const sprinklesObj = rainbowSprinkles({
        ...omit(props, ["attributes", "as", "boxRef"]),
        ...props.attributes,
      });
      state.className = clsx(sprinklesObj.className, props.className);
      state.style = sprinklesObj.style;
      state.passThroughProps = sprinklesObj.otherProps;
    },
  });

  onMount(() => {
    state.calculateStyles();
  });

  onUpdate(() => {
    state.calculateStyles();
  }, [props]);

  return (
    <props.as
      className={state.className}
      style={state.style}
      {...state._passThroughProps}
      ref={props.boxRef}
    >
      {props.children}
    </props.as>
  );
}
