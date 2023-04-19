import {
  useMetadata,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
} from "@builder.io/mitosis";
import clsx from "clsx";
import { sprinkles } from "../../styles/sprinkles.css";
import type { Sprinkles } from "../../styles/sprinkles.css";
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
    sprinklesClass: string;
    calculateStyles: () => void;
  }>({
    atomProps: {},
    nativeProps: {},
    sprinklesClass: "",
    calculateStyles() {
      let atoms = {};
      let natives = {};

      Object.keys(props).forEach((key) => {
        if (sprinkles.properties.has(key as keyof Sprinkles)) {
          atoms[key] = props[key as keyof typeof props];
        } else {
          natives[key] = props[key as keyof typeof props];
        }
      });

      state.atomProps = atoms;
      state.nativeProps = natives;
      state.sprinklesClass = sprinkles({
        ...state.atomProps,
      });
    },
  });

  onMount(() => {
    state.calculateStyles();
  });

  onUpdate(() => {
    state.calculateStyles();
  }, [props]);

  return (
    <props.as className={clsx(state.sprinklesClass, props.className)}>
      {props.children}
    </props.as>
  );
}
