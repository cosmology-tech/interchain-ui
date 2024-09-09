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
