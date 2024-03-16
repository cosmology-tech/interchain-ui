<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal';
import ModalView from './modal/modal.vue';
import Button from './v-button.vue';

const { open, close } = useModal({
  component: ModalView,
  attrs: {
  },
  slots: {
    default: '<p>The content of the modal</p>',
  },
})
</script>

<template>
  <div class="flex w-[100vw] h-[100vh]">
    <div class="flex flex-col gap-4 text-center mx-auto my-0 pt-[300px]">
      <p>Vite + Vue + @interchain-ui/vue demo</p>

      <Button @click="open">
        <span class="flex justify-center items-center">
          Open Modal
        </span>
      </Button>
    </div>
  </div>


  <ModalsContainer />
</template>
