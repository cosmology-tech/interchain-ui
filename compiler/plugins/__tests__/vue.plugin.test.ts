import { fixVueEventHandlers } from "../vue.plugin";
import { buttonEventHandlersFixture } from "../__fixtures__/button-event-handlers";

describe("vue plugin", () => {
  it("should fix vue event handlers", () => {
    const result = fixVueEventHandlers(buttonEventHandlersFixture);
    const vBind = 'v-bind="{ ...spreadAttributes, ...eventHandlers }"';
    const vOn = 'v-on="{ ...eventHandlers }"';

    console.log(result);
    expect(result).not.toContain(vBind);
    expect(result).toContain(vOn);
  });
});
