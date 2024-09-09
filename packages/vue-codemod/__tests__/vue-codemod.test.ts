import { it, expect } from "vitest";
import { transform } from "vue-metamorph";
import { vueMitosisCodeMod } from "../src/plugins/vue-mitosis.plugin";

it("should remove eventHanlders in a v-bind with spread operator", () => {
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

  const result = transform(source, "file.vue", [vueMitosisCodeMod]).code;
  expect(result.replace(/\s+/g, "")).toBe(expected.replace(/\s+/g, ""));
});

it("should remove eventHanlders in a v-bind with itself as the value", () => {
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

  const result = transform(source, "file.vue", [vueMitosisCodeMod]).code;
  expect(result).toBe(expected);
});
