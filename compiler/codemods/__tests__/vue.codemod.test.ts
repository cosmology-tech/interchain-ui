import { transform } from "../vue.codemod.js";

describe("vue codemod", () => {
  it("should change all string literals to hello world", () => {
    const source = `
  <template>
    <div v-if="someCondition">
      <span v-if="anotherCondition">Hello, world!</span>
    </div>
  </template>
  `;

    const expected = `
  <template>
    <div>
      <span>Hello, world!</span>
    </div>
  </template>
  `;

    expect(transform(source)).toBe(expected);
  });
});
