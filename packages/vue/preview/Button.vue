<template>
  <button :class="classes" @click="onClick">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const classes = computed(() => ({
      'storybook-button': true,
      'storybook-button--primary': props.primary,
      'storybook-button--secondary': !props.primary,
      [`storybook-button--${props.size || 'medium'}`]: true
    }))

    const onClick = () => {
      emit('click')
    }

    return {
      classes,
      onClick
    }
  }
})
</script>

<style scoped>
.storybook-button {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}

.storybook-button--primary {
  color: white;
  background-color: #1ea7fd;
}

.storybook-button--secondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}

.storybook-button--small {
  font-size: 12px;
  padding: 10px 16px;
}

.storybook-button--medium {
  font-size: 14px;
  padding: 11px 20px;
}

.storybook-button--large {
  font-size: 16px;
  padding: 12px 24px;
}
</style>
