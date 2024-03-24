<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

defineProps({
  closeOnClickaway: {
    type: Boolean,
    required: false,
    default: true
  },
  modelValue: Boolean,
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <VueFinalModal :click-to-close="closeOnClickaway" :esc-to-close="true" class="confirm-modal"
    content-class="confirm-modal-content" overlay-transition="vfm-fade" content-transition="vfm-fade">

    <slot name="header"></slot>
    <slot />
    <slot name="footer"></slot>

  </VueFinalModal>
</template>

<style></style>
