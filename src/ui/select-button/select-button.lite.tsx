import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import {
  buttonStyles,
  buttonRoot,
  buttonIntent,
  selectSizes,
  arrowDropDown,
  buttonContent,
} from "./select-button.css";
import type { ThemeVariant } from "../../models/system.model";
import type { SelectButtonProps } from "./select-button.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function SelectButton(props: SelectButtonProps) {
  useDefaultProps({
    intent: "default",
    size: "sm",
  });

  const state = useStore<{
    theme: ThemeVariant;
  }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      {...props._css}
      className={clx(
        buttonRoot,
        props.disabled ? buttonIntent.disabled : buttonIntent[props.intent],
        props.className
      )}
      attributes={props.attributes}
    >
      <button
        type="button"
        className={clx(buttonStyles[state.theme], selectSizes[props.size])}
        onClick={() => props?.onClick()}
        ref={props.buttonRef}
        {...props.buttonAttributes}
      >
        <span className={buttonContent}>
          <span>{props.placeholder ?? "Select option"}</span>
          <Icon name="arrowDropDown" className={arrowDropDown} />
        </span>
      </button>
    </Box>
  );
}
