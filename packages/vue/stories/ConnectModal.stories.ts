import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Modal from "../src/ui/modal/modal.vue";
import Button from "../src/ui/button/button.vue";
import Box from "../src/ui/box/box.vue";
import ConnectModalQRCode from "../src/ui/connect-modal-qrcode/connect-modal-qrcode.vue";
import ConnectModalHead from "../src/ui/connect-modal-head/connect-modal-head.vue";
import ConnectModalWalletList from "../src/ui/connect-modal-wallet-list/connect-modal-wallet-list.vue";
import {
  wallets,
  qrCodeProps,
  WalletPluginSystem,
} from "./stub/connectWalletData";

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "ConnectModal/ConnectModal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Modal>;

function convert(ws: typeof wallets) {
  return ws.map((wallet) => ({
    ...wallet,
    logo: wallet.extends
      ? WalletPluginSystem[wallet.extends].logo
      : wallet.logo,
    badge: wallet.extends ? WalletPluginSystem[wallet.extends].text : undefined,
    btmLogo: wallet.extends ? wallet.logo : undefined,
  }));
}

export const Primary: Story = {
  render: (args) => ({
    components: {
      Modal,
      Button,
      Box,
      ConnectModalQRCode,
      ConnectModalHead,
      ConnectModalWalletList,
    },
    setup() {
      const isOpen = ref(false);
      const hasBack = ref(false);
      const onClose = () => {
        isOpen.value = false;
        hasBack.value = false;
      };
      const onBack = () => {
        hasBack.value = false;
      };
      const onNext = () => {
        hasBack.value = true;
      };
      const convertedWallets = convert(wallets);

      return {
        args,
        isOpen,
        hasBack,
        onClose,
        onBack,
        onNext,
        convertedWallets,
        qrCodeProps,
      };
    },
    template: `
      <Box>
        <Button @click="isOpen = true">Open modal</Button>
        <Modal
          :is-open="isOpen"
          @close="onClose"
        >
          <template #header="{ closeButtonProps }">
            <ConnectModalHead
              title="Connect Wallet"
              :hasCloseButton="true"
              :hasBackButton="hasBack"
              @back="onBack"
              :closeButtonProps="closeButtonProps"
            />
          </template>
          <ConnectModalQRCode v-if="hasBack" v-bind="qrCodeProps" />
          <ConnectModalWalletList
            v-else
            :wallets="convertedWallets"
            @wallet-item-click="onNext"
          />
        </Modal>
      </Box>
    `,
  }),
};
