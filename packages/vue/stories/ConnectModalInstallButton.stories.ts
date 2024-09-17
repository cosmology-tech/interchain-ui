import type { Meta, StoryObj } from "@storybook/vue3";
import Box from "../src/ui/box/box.vue";
import Icon from "../src/ui/icon/icon.vue";
import ConnectModalInstallButton from "../src/ui/connect-modal-install-button/connect-modal-install-button.vue";
import { ref } from "vue";

const meta: Meta<typeof ConnectModalInstallButton> = {
  component: ConnectModalInstallButton,
  title: "ConnectModal/ConnectModalInstallButton",
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    fluidWidth: { control: "boolean" },
    onClick: { action: "clicked" },
    onHoverStart: { action: "hover started" },
    onHoverEnd: { action: "hover ended" },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalInstallButton>;

export const Primary: Story = {
  args: {
    disabled: false,
    fluidWidth: false,
  },
  render: (args) => ({
    components: { ConnectModalInstallButton, Icon, Box },
    setup() {
      const theme = ref("light");

      return { args, theme };
    },
    template: `
      <ConnectModalInstallButton v-bind="args">
        <Box as="span" display="flex" alignItems="center" gap="8px">
          Install Wallet
          <Icon name="chromeBrowser" />
        </Box>
      </ConnectModalInstallButton>
    `,
  }),
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const FluidWidth: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    fluidWidth: true,
  },
};
