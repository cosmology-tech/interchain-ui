import { it, expect } from "vitest";
import { transform } from "vue-metamorph";
import { vueMitosisCodeMod } from "../src/plugins/vue-mitosis.plugin";

function transformCode(source: string) {
  return transform(source, "file.vue", [vueMitosisCodeMod]).code;
}

function trimWhitespace(code: string) {
  return code.replace(/\s+/g, "");
}

it("should remove eventHandlers in a v-bind with spread operator", () => {
  const source = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
    v-bind="{ ...spreadAttributes, ...obj, ...eventHandlers }"
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
  `;

  const expected = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
    v-bind="{
      ...spreadAttributes, ...obj,
    }"
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
  `;

  const result = transformCode(source);
  expect(trimWhitespace(result)).toBe(trimWhitespace(expected));
});

it("should remove eventHandlers in a v-bind only containing itself", () => {
  const source = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
    v-bind="eventHandlers"
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
  `;

  const expected = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
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
  `;
  const result = transformCode(source);
  expect(trimWhitespace(result)).toBe(trimWhitespace(expected));
});

it("should remove eventHandlers in a v-bind only containing itself in a spread", () => {
  const source = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
    v-bind="{ ...eventHandlers }"
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
  `;

  const expected = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
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
  `;
  const result = transformCode(source);
  expect(trimWhitespace(result)).toBe(trimWhitespace(expected));
});

it("should add defineEmits to script setup if eventHandlers is present and fix eventName in expressions", () => {
  const source = `
  <template>
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

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import Spinner from "../spinner";
import { store } from "../../models/store";
import { recipe, buttonOverrides } from "./button.helper";
import { isDefaultAccent, getAccentHover } from "../../helpers/style";
import { themeVars } from "../../styles/themes.css";
import { fullWidth, fullWidthHeight } from "../shared/shared.css";
import * as styles from "./button.css";

const props = withDefaults(defineProps(), {
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

const cleanupRef = ref(null);

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
    cleanupRef();
  }
});
const combinedClassName = computed(() => {
  return clx(
    styles.buttonSize[props.size],
    recipe({
      as: props.as,
      variant: props.variant,
      intent: "primary",
      isDisabled: props.disabled || props.isLoading,
      theme: getStoreState().theme,
    }),
    props.fluidWidth ? fullWidth : null,
    props.fluid ? fullWidthHeight : null,
    props.className
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
  const eventProps = [
    "onClick",
    "onDoubleClick",
    "onMouseDown",
    "onMouseUp",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseMove",
    "onMouseOver",
    "onMouseOut",
    "onKeyDown",
    "onKeyUp",
    "onKeyPress",
    "onFocus",
    "onBlur",
    "onInput",
    "onChange",
    "onSubmit",
    "onReset",
    "onScroll",
    "onWheel",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onDragEnter",
    "onDragLeave",
    "onDragOver",
    "onDrop",
    "onTouchStart",
    "onTouchMove",
    "onTouchEnd",
    "onTouchCancel",
  ];
  eventProps.forEach((eventName) => {
    if (props.eventName) {
      handlers[eventName] = (event) => props.eventName(event);
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

</script>
  `;

  const expected = `
  <template>
  <Box
    :boxRef="buttonRef"
    :class="combinedClassName"
    v-bind="{
  ...spreadAttributes,
}"
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

<script setup>
const emit = defineEmits([
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseover',
  'mouseout',
  'keydown',
  'keyup',
  'keypress',
  'focus',
  'blur',
  'input',
  'change',
  'submit',
  'reset',
  'scroll',
  'wheel',
  'dragstart',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'drop',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
]);


import { computed, onMounted, onUnmounted, ref } from 'vue';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import clx from 'clsx';
import Icon from '../icon';
import Box from '../box';
import Spinner from '../spinner';
import { store } from '../../models/store';
import { recipe, buttonOverrides } from './button.helper';
import { isDefaultAccent, getAccentHover } from '../../helpers/style';
import { themeVars } from '../../styles/themes.css';
import { fullWidth, fullWidthHeight } from '../shared/shared.css';
import * as styles from './button.css';

const props = withDefaults(defineProps(), {
  intent: 'primary',
  size: 'md',
  as: 'button',
  variant: 'solid',
  disabled: undefined,
  isLoading: undefined,
  fluidWidth: undefined,
  fluid: undefined,
  className: undefined,
  attributes: undefined,
  domAttributes: undefined,
  buttonRef: undefined,
  iconSize: undefined,
  spinnerPlacement: 'start',
  leftIcon: undefined,
  children: undefined,
  rightIcon: undefined,
});
const _overrideManager = ref(null);
const _theme = ref('light');
const _themeAccent = ref(null);

const cleanupRef = ref(null);

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
  if (typeof cleanupRef.value === 'function') {
    cleanupRef();
  }
});
const combinedClassName = computed(() => {
  return clx(
    styles.buttonSize[props.size],
    recipe({
      as: props.as,
      variant: props.variant,
      intent: 'primary',
      isDisabled: props.disabled || props.isLoading,
      theme: getStoreState().theme,
    }),
    props.fluidWidth ? fullWidth : null,
    props.fluid ? fullWidthHeight : null,
    props.className
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
  const eventProps = [
    'onClick',
    'onDoubleClick',
    'onMouseDown',
    'onMouseUp',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOver',
    'onMouseOut',
    'onKeyDown',
    'onKeyUp',
    'onKeyPress',
    'onFocus',
    'onBlur',
    'onInput',
    'onChange',
    'onSubmit',
    'onReset',
    'onScroll',
    'onWheel',
    'onDragStart',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragLeave',
    'onDragOver',
    'onDrop',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
  ];
  eventProps.forEach((eventName) => {
    if (props[eventName]) {
      handlers[eventName] = (event) => props[eventName](event);
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
</script>
  `;
  const result = transformCode(source);
  expect(trimWhitespace(result)).toBe(trimWhitespace(expected));
});
