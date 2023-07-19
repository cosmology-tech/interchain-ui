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
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BoxProps } from "./box.types";
import { DEFAULT_VALUES } from "./box.types";

useMetadata({ isAttachedToShadowDom: true });

export default function Box(props: BoxProps) {
  useDefaultProps({
    as: DEFAULT_VALUES.as,
  });

  const state = useStore<{
    atomProps: Record<string, unknown>;
    nativeProps: Record<string, unknown>;
    style: Record<string, unknown>;
    passThroughProps: Record<string, unknown>;
    className: string;
    calculateStyles: () => void;
  }>({
    atomProps: {},
    nativeProps: {},
    className: "",
    style: {},
    passThroughProps: {},
    calculateStyles() {
      let atoms = {};
      let natives = {};

      Object.keys(props).forEach((key) => {
        // @ts-ignore
        if (sprinkles.properties.has(key as keyof Sprinkles)) {
          atoms[key] = props[key as keyof typeof props];
        } else {
          natives[key] = props[key as keyof typeof props];
        }
      });

      state.atomProps = atoms;
      state.nativeProps = natives;

      const sprinklesObj = rainbowSprinkles({
        ...omit(props, ["attributes"]),
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
      {...state.passThroughProps}
      ref={props.boxRef}
    >
      {props.children}
    </props.as>
  );
}
