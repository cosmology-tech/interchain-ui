import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModal from "../src/ui/connect-modal/connect-modal.vue";
import Button from "../src/ui/button/button.vue";
import Box from "../src/ui/box/box.vue";
import ConnectModalQRCode from "../src/ui/connect-modal-qrcode/connect-modal-qrcode.vue";
import ConnectModalHead from "../src/ui/connect-modal-head/connect-modal-head.vue";
import ConnectModalWalletList from "../src/ui/connect-modal-wallet-list/connect-modal-wallet-list.vue";
import ConnectModalStatus from "../src/ui/connect-modal-status/connect-modal-status.vue";
import { wallets, qrCodeProps } from "./stub/connectWalletData";

export const WalletPluginSystem = {
  MetaMask: {
    name: "MetaMask Snaps",
    logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI3LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDIwNC44IDE5Mi40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMDQuOCAxOTIuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtkaXNwbGF5Om5vbmU7fQoJLnN0MXtmaWxsOiNGNTg0MUY7fQoJLnN0MntmaWxsOiNFMjc2MjU7fQoJLnN0M3tmaWxsOiNEN0MxQjM7fQoJLnN0NHtmaWxsOiMyRjM0M0I7fQoJLnN0NXtmaWxsOiNDQzYyMjg7fQoJLnN0NntmaWxsOiNDMEFEOUU7fQoJLnN0N3tmaWxsOiM3NjNFMUE7fQo8L3N0eWxlPgo8ZyBpZD0iYmdfeDI4X2RvX25vdF9leHBvcnRfeDI5XyIgY2xhc3M9InN0MCI+CjwvZz4KPGcgaWQ9Ik1NX0hlYWRfYmFja2dyb3VuZF9feDI4X0RvX25vdF9lZGl0X3gyOV8iPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ny40LDk2LjFsNi45LTguMWwtMy0yLjJsNC44LTQuNGwtMy43LTIuOGw0LjgtMy42bC0zLjEtMi40bDUtMjQuNGwtNy42LTIyLjYgTTE3MS41LDI1LjZsLTQ4LjgsMTguMWwwLDAKCQkJbDAsMEg4MmwwLDBMMzMuMiwyNS42bDAuMywwLjJsLTAuMy0wLjJsLTcuNiwyMi42bDUuMSwyNC40TDI3LjUsNzVsNC45LDMuNmwtMy43LDIuOGw0LjgsNC40bC0zLDIuMmw2LjksOC4xbC0xMC41LDMyLjRoMGwwLDAKCQkJbDkuNywzMy4xbDM0LjEtOS40bDAtMC4xbDAsMC4xbDAsMGwwLDBsMCwwdjBsMCwwbDAsMGwwLDBsNi42LDUuNGwxMy41LDkuMmgyMy4xbDEzLjUtOS4ybDYuNi01LjRsMCwwdjBsMCwwbDAsMGwzNC4yLDkuNAoJCQlsOS44LTMzLjFsMCwwaDBsLTEwLjYtMzIuNCBNNzAuNywxNTIuMUw3MC43LDE1Mi4xTDcwLjcsMTUyLjEiLz4KCTwvZz4KPC9nPgo8ZyBpZD0iTG9nb3MiPgoJPGc+CgkJPHBvbHlnb24gY2xhc3M9InN0MiIgcG9pbnRzPSIxNzEuNSwyNS42IDExMS42LDY5LjcgMTIyLjcsNDMuNyAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMzMuMiwyNS42IDkyLjYsNzAuMSA4Miw0My43IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MiIgcG9pbnRzPSIxNTAsMTI3LjkgMTM0LDE1Mi4xIDE2OC4yLDE2MS41IDE3OCwxMjguNCAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMjYuOSwxMjguNCAzNi42LDE2MS41IDcwLjcsMTUyLjEgNTQuOCwxMjcuOSAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iNjguOSw4Ni45IDU5LjQsMTAxLjIgOTMuMiwxMDIuNyA5Mi4xLDY2LjUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjEzNS45LDg2LjkgMTEyLjMsNjYuMSAxMTEuNiwxMDIuNyAxNDUuNCwxMDEuMiAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iNzAuNywxNTIuMSA5MS4yLDE0Mi4zIDczLjUsMTI4LjcgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjExMy42LDE0Mi4zIDEzNCwxNTIuMSAxMzEuMiwxMjguNyAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDMiIHBvaW50cz0iMTM0LDE1Mi4xIDExMy42LDE0Mi4zIDExNS4zLDE1NS41IDExNS4xLDE2MS4xIAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MyIgcG9pbnRzPSI3MC43LDE1Mi4xIDg5LjcsMTYxLjEgODkuNiwxNTUuNSA5MS4yLDE0Mi4zIAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSI5MCwxMTkuOSA3My4xLDExNSA4NS4xLDEwOS41IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMTQuNywxMTkuOSAxMTkuNywxMDkuNSAxMzEuNywxMTUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q1IiBwb2ludHM9IjcwLjcsMTUyLjEgNzMuNywxMjcuOSA1NC44LDEyOC40IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxMzEuMSwxMjcuOSAxMzQsMTUyLjEgMTUwLDEyOC40IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxNDUuNCwxMDEuMiAxMTEuNiwxMDIuNyAxMTQuNywxMTkuOSAxMTkuNywxMDkuNSAxMzEuNywxMTUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q1IiBwb2ludHM9IjczLjEsMTE1IDg1LjEsMTA5LjUgOTAsMTE5LjkgOTMuMiwxMDIuNyA1OS40LDEwMS4yIAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MiIgcG9pbnRzPSI1OS40LDEwMS4yIDczLjUsMTI4LjcgNzMuMSwxMTUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjEzMS43LDExNSAxMzEuMiwxMjguNyAxNDUuNCwxMDEuMiAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iOTMuMiwxMDIuNyA5MCwxMTkuOSA5NCwxNDAuMyA5NC45LDExMy41IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MiIgcG9pbnRzPSIxMTEuNiwxMDIuNyAxMDkuOSwxMTMuNCAxMTAuNywxNDAuMyAxMTQuNywxMTkuOSAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMTE0LjcsMTE5LjkgMTEwLjcsMTQwLjMgMTEzLjYsMTQyLjMgMTMxLjIsMTI4LjcgMTMxLjcsMTE1IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSI3My4xLDExNSA3My41LDEyOC43IDkxLjIsMTQyLjMgOTQsMTQwLjMgOTAsMTE5LjkgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjExNS4xLDE2MS4xIDExNS4zLDE1NS41IDExMy43LDE1NC4yIDkxLDE1NC4yIDg5LjYsMTU1LjUgODkuNywxNjEuMSA3MC43LDE1Mi4xIDc3LjMsMTU3LjUgCgkJCTkwLjgsMTY2LjggMTEzLjksMTY2LjggMTI3LjQsMTU3LjUgMTM0LDE1Mi4xIAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMTMuNiwxNDIuMyAxMTAuNywxNDAuMyA5NCwxNDAuMyA5MS4yLDE0Mi4zIDg5LjYsMTU1LjUgOTEsMTU0LjIgMTEzLjcsMTU0LjIgMTE1LjMsMTU1LjUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q3IiBwb2ludHM9IjE3NC4xLDcyLjYgMTc5LjEsNDguMiAxNzEuNSwyNS42IDExMy42LDY4LjIgMTM1LjksODYuOSAxNjcuNCw5Ni4xIDE3NC4zLDg4IDE3MS4zLDg1LjggMTc2LjEsODEuNSAKCQkJMTcyLjQsNzguNiAxNzcuMiw3NSAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDciIHBvaW50cz0iMjUuNiw0OC4yIDMwLjcsNzIuNiAyNy41LDc1IDMyLjMsNzguNyAyOC42LDgxLjUgMzMuNCw4NS44IDMwLjQsODggMzcuNCw5Ni4xIDY4LjksODYuOSA5MS4yLDY4LjIgCgkJCTMzLjIsMjUuNiAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMTY3LjQsOTYuMSAxMzUuOSw4Ni45IDE0NS40LDEwMS4yIDEzMS4yLDEyOC43IDE1MCwxMjguNCAxNzgsMTI4LjQgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjY4LjksODYuOSAzNy40LDk2LjEgMjYuOSwxMjguNCA1NC44LDEyOC40IDczLjUsMTI4LjcgNTkuNCwxMDEuMiAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMTExLjYsMTAyLjcgMTEzLjYsNjguMiAxMjIuNyw0My43IDgyLDQzLjcgOTEuMiw2OC4yIDkzLjIsMTAyLjcgOTQsMTEzLjUgOTQsMTQwLjMgMTEwLjcsMTQwLjMgCgkJCTExMC44LDExMy41IAkJIi8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==",
  },
} as const;

const meta: Meta<typeof ConnectModal> = {
  component: ConnectModal,
  title: "ConnectModal/ConnectModal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ConnectModal>;

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
      ConnectModal,
      Button,
      Box,
      ConnectModalQRCode,
      ConnectModalHead,
      ConnectModalWalletList,
    },
    setup() {
      const isOpen = ref(false);
      const hasBack = ref(false);
      const onClose = () => (isOpen.value = false);
      const onBack = () => (hasBack.value = false);
      const onNext = () => (hasBack.value = true);

      return { args, isOpen, hasBack, onClose, onBack, onNext };
    },
    template: `
      <Box>
        <Button @click="isOpen = true">Open modal</Button>
        <ConnectModal
          :is-open="isOpen"
          @close="onClose"
        >
          <template #header>
            <ConnectModalHead
              title="Select your wallet"
              :has-close-button="true"
              :has-back-button="hasBack"
              @back="onBack"
              @close="onClose"
            />
          </template>
          <ConnectModalQRCode v-if="hasBack" v-bind="qrCodeProps" />
          <ConnectModalWalletList
            v-else
            :wallets="convert(wallets)"
            @wallet-item-click="onNext"
          />
        </ConnectModal>
      </Box>
    `,
  }),
};

export const ConnectModalStatusView: Story = {
  render: () => ({
    components: { ConnectModalStatus },
    setup() {
      return {
        status: "Connected",
        connectedInfo: {
          avatar: "https://picsum.photos/id/237/200/200",
          name: "Hello name",
          address: "0x1234567890",
        },
        wallet: {
          logo: "https://picsum.photos/id/237/200/200",
          name: "Hello name",
          mobileDisabled: true,
        },
      };
    },
    template: `
      <ConnectModalStatus
        :status="status"
        :connected-info="connectedInfo"
        :wallet="wallet"
      />
    `,
  }),
};
