<template>
  <div>
    <h1>{{ title }}</h1>
    <Button :primary="true" label="Primary Button" />
    <Button :primary="false" label="Secondary Button" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from './components/Button.vue'

export default defineComponent({
  name: 'App',
  components: {
    Button
  },
  data() {
    return {
      title: 'Vue Package Example'
    }
  }
})
</script>
