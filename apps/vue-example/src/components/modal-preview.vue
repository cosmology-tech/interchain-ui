<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal';
import { Box } from '@interchain-ui/vue'
import ModalView from './modal/modal.vue';
import VButton from './v-button.vue';

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

      <Box color="$blue400" bg="$cardBg" padding="$4">
        Hello Boxy box
      </Box>

      <VButton @click="open">
        <span class="flex justify-center items-center">
          Open Modal
        </span>
      </VButton>

      <VButton @click="close">
        <span class="flex justify-center items-center">
          Close Modal
        </span>
      </VButton>
    </div>
  </div>


  <ModalsContainer />
</template>
