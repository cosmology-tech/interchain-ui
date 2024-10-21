<script setup lang="ts">
import { ref } from "vue";
import {
  Box,
  Modal,
  Button,
  ConnectModalQrcode,
  ConnectModalHead,
  ConnectModalWalletList,
} from "@interchain-ui/vue";

import {
  wallets,
  qrCodeProps,
  WalletPluginSystem,
} from "../data/connect-wallet-data";

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

const isOpen = ref(false);
const hasBack = ref(false);

function onClose() {
  isOpen.value = false;
  hasBack.value = false;
}

function onBack() {
  hasBack.value = false;
}

function onNext() {
  hasBack.value = true;
}

const convertedWallets = convert(wallets);
</script>

<template>
  <div class="flex w-[100vw] h-[100vh]">
    <div class="flex flex-col gap-4 text-center mx-auto my-0 pt-[300px]">
      <p>Vite + Vue + @interchain-ui/vue demo</p>

      <Box color="$blue400" bg="$cardBg" padding="$4"> Hello Boxy box </Box>

      <Button @click="isOpen = true">
        <span class="flex justify-center items-center">
          Open Connect Modal
        </span>
      </Button>
    </div>
  </div>

  <Modal :is-open="isOpen" @close="onClose">
    <template #header="{ closeButtonProps }">
      <ConnectModalHead
        title="Connect Wallet"
        :hasCloseButton="true"
        :hasBackButton="hasBack"
        @back="onBack"
        :closeButtonProps="closeButtonProps"
      />
    </template>
    <ConnectModalQrcode v-if="hasBack" v-bind="qrCodeProps" />
    <ConnectModalWalletList
      v-else
      :wallets="convertedWallets"
      @wallet-item-click="onNext"
    />
  </Modal>
</template>
