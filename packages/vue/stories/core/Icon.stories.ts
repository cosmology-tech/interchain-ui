import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "../../src/ui/icon/icon.vue";
import Box from "../../src/ui/box/box.vue";
import Text from "../../src/ui/text/text.vue";
import { ALL_ICON_NAMES } from "../../src/ui/icon/icon.types";

const meta: Meta<typeof Icon> = {
  title: "Core/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ALL_ICON_NAMES,
    },
    size: {
      control: "text",
    },
    color: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { Icon, Box, Text },
    setup() {
      return { args, ALL_ICON_NAMES };
    },
    template: `
      <div
        style="
          display: grid;
          grid-auto-rows: min-content;
          grid-auto-flow: row dense;
          grid-auto-columns: minmax(0, 1fr);
          grid-template-columns: repeat(4, minmax(0, 1fr));
          row-gap: 40px;
        "
      >
        <Box
          v-for="iconName in ALL_ICON_NAMES"
          :key="iconName"
          display="inline-flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="200px"
          color="$text"
          fontSize="$xl"
        >
          <Icon :name="iconName" v-bind="args" fontSize="inherit" />
          <Text
            :attributes="{
              mt: '$4',
              display: 'inline-block',
            }"
          >
            {{ iconName }}
          </Text>
        </Box>
      </div>
    `,
  }),
};
