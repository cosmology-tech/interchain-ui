<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'medium',
  },
  bold: {
    type: Boolean,
    default: false,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  blank: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <button class="v-button" :class="[size, bold ? 'font-semibold' : 'font-medium']">
    <Icon v-if="icon" :icon="icon" class="w-4 h-4 mr-2" />
    <slot />
  </button>
</template>

<style lang="postcss" scoped>
.v-button {
  @apply text-center bg-blue-500 hover:bg-blue-600 focus:ring-blue-600 mb-2 inline-flex flex-none items-center justify-center rounded-lg border border-transparent px-3 py-1.5 text-sm leading-4 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900;
}

.v-button.medium {
  @apply px-4 py-2 text-base leading-4;
}

.v-button.large {
  @apply px-6 py-2.5 text-lg leading-6;
}

.v-button.transparent {
  @apply bg-transparent px-0 py-0;
}
</style>
