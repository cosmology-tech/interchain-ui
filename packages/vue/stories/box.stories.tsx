import Box from "../src/ui/box/box.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: "Core/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
    onClick: {},
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Primary = {
  args: {
    children: "Hello",
  },
};
