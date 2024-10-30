import { ref, onMounted } from "vue";
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

const INITIAL_LIMIT = 4;
const FINAL_LIMIT = 2;

function convert(ws: typeof wallets, limit: number) {
  return ws
    .map((wallet) => ({
      ...wallet,
      logo: wallet.extends
        ? WalletPluginSystem[wallet.extends].logo
        : wallet.logo,
      badge: wallet.extends
        ? WalletPluginSystem[wallet.extends].text
        : undefined,
      btmLogo: wallet.extends ? wallet.logo : undefined,
    }))
    .slice(0, limit);
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
      const walletLimit = ref(INITIAL_LIMIT);

      onMounted(() => {
        setTimeout(() => {
          walletLimit.value = FINAL_LIMIT;
        }, 1000);
      });

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
      const convertedWallets = convert(wallets, walletLimit.value);

      return {
        args,
        isOpen,
        hasBack,
        onClose,
        onBack,
        onNext,
        convertedWallets,
        qrCodeProps,
        closeButtonProps: {
          onClick: onClose,
        },
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
              id="connect-modal-head-title"
              title="Select your wallet"
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
