<template>
  <scaffold-modal :trigger="<button>hello</button>">
    <slot />
  </scaffold-modal>
</template>

<script lang="ts">
import Button from "../button";
import { WalletConnectModalProps } from "./wallet-connect-modal.types";

export default {
  name: "wallet-connect-modal",
  components: { ScaffoldModal: ScaffoldModal },
  props: [],
};
</script>