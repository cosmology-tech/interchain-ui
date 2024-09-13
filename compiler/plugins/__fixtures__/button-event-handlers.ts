export const buttonEventHandlersFixture = `<template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
    v-bind="{ ...spreadAttributes, ...eventHandlers }"
    ><Spinner
      :size="iconSize"
      :attributes="{
        display:
          isLoading && spinnerPlacement === 'start' ? 'inline-block' : 'none',
      }"
    ></Spinner
    ><Icon
      :name="leftIcon"
      :size="iconSize"
      :attributes="{
        display: !!leftIcon && !isLoading ? 'inline-block' : 'none',
        marginRight: !$slots.default ? '$0' : '$2',
      }"
    ></Icon>
    <template v-if="!isLoading">
      <slot />
    </template>

    <Icon
      :name="rightIcon"
      :size="iconSize"
      :attributes="{
        display: !!rightIcon && !isLoading ? 'inline-block' : 'none',
        marginLeft: !$slots.default ? '$0' : '$2',
      }"
    ></Icon
    ><Spinner
      :size="iconSize"
      :attributes="{
        display:
          isLoading && spinnerPlacement === 'end' ? 'inline-block' : 'none',
      }"
    ></Spinner
  ></Box>
</template>

<script setup lang="ts">
const eventMappings = {
  onClick: "click",
  onDoubleClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onMouseMove: "mousemove",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onKeyDown: "keydown",
  onKeyUp: "keyup",
  onKeyPress: "keypress",
  onFocus: "focus",
  onBlur: "blur",
  onInput: "input",
  onChange: "change",
  onSubmit: "submit",
  onReset: "reset",
  onScroll: "scroll",
  onWheel: "wheel",
  onDragStart: "dragstart",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragEnter: "dragenter",
  onDragLeave: "dragleave",
  onDragOver: "dragover",
  onDrop: "drop",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend",
  onTouchCancel: "touchcancel",
};

const emit = defineEmits([
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "keydown",
  "keyup",
  "keypress",
  "focus",
  "blur",
  "input",
  "change",
  "submit",
  "reset",
  "scroll",
  "wheel",
  "dragstart",
  "drag",
  "dragend",
  "dragenter",
  "dragleave",
  "dragover",
  "drop",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
]);
import { computed, onMounted, onUnmounted, ref } from "vue";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import Spinner from "../spinner";
import { store, UIState } from "../../models/store";
import { recipe, buttonOverrides } from "./button.helper";
import { isDefaultAccent, getAccentHover } from "../../helpers/style";
import { themeVars } from "../../styles/themes.css";
import { fullWidth, fullWidthHeight } from "../shared/shared.css";
import type { UnknownRecord } from "../../helpers/types";
import type { ButtonProps } from "./button.types";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";
import * as styles from "./button.css";
const props = withDefaults(defineProps<ButtonProps>(), {
  intent: "primary",
  size: "md",
  as: "button",
  variant: "solid",
  disabled: undefined,
  isLoading: undefined,
  fluidWidth: undefined,
  fluid: undefined,
  className: undefined,
  attributes: undefined,
  domAttributes: undefined,
  buttonRef: undefined,
  iconSize: undefined,
  spinnerPlacement: "start",
  leftIcon: undefined,
  children: undefined,
  rightIcon: undefined,
});
const _overrideManager = ref(null);
const _theme = ref("light");
const _themeAccent = ref(null);
const cleanupRef = ref<() => void>();
onMounted(() => {
  const uiStore = getStoreState();
  _theme.value = uiStore[0];
  _themeAccent.value = uiStore[1];
  _overrideManager.value = uiStore[2];
  cleanupRef.value = store.subscribe((newState, prevState) => {
    _theme.value = newState.theme;
    _themeAccent.value = newState.themeAccent;
    _overrideManager.value = newState.overrideStyleManager;
  });
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") {
    cleanupRef.value();
  }
});
const combinedClassName = computed(() => {
  return clx(
    styles.buttonSize[props.size],
    recipe({
      as: props.as,
      variant: props.variant,
      intent: props.intent ?? "primary",
      isDisabled: props.disabled || props.isLoading,
      theme: getStoreState().theme,
    }),
    props.fluidWidth ? fullWidth : null,
    props.fluid ? fullWidthHeight : null,
    props.class
  );
});
const spreadAttributes = computed(() => {
  return Object.assign(
    {
      as: props.as,
    },
    {
      attributes: {
        ...props.attributes,
        disabled: props.disabled,
        // style: state.getVars(),
        ...props.domAttributes,
      },
    }
  );
});
const eventHandlers = computed(() => {
  const handlers = {};
  Object.entries(eventMappings).forEach(([propName, eventName]) => {
    if (propName in props) {
      handlers[eventName] = (event) => {
        const propEventHandler = props[propName];
        if (typeof propEventHandler === "function") {
          propEventHandler(event);
        }
        emit(eventName, event);
      };
    }
  });
  return handlers;
});
function getStoreState() {
  // This seems weird but it's a workaround for one minor bug from mitosis
  // If we have any variables in any function scope that has the same name as the store state, mitosis understands that it's the same variable
  // and will attempt to transform those unwanted/unrelated variables into the ones in the state.<variable>
  // So we need to name these values differently (e.g. _keyA: valueA) or inverse
  return {
    theme: store.getState().theme,
    themeAccent: store.getState().themeAccent,
    overrideStyleManager: store.getState().overrideStyleManager,
  };
}
function getVars() {
  const accent = _themeAccent.value;
  const isDefaultAppearance = isDefaultAccent(accent) && accent === "blue";

  // Only allow accent customization for 'primary' Intent
  const isPrimaryIntent = props.intent === "primary";
  return isDefaultAppearance || !isPrimaryIntent
    ? _overrideManager.value?.applyOverrides(buttonOverrides.name)
    : assignInlineVars({
        [styles.buttonBgVar]: themeVars.colors.accent,
        [styles.buttonTextColorVar]: themeVars.colors.accentText,
        [styles.buttonHoverBgVar]: getAccentHover(themeVars.colors.accent),
      });
}
</script>
`;