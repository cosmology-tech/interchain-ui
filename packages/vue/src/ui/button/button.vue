<template>
  <template v-if="state.loaded">
    <button :class="_classStringToObject(buttonStyles)"><slot /></button>
  </template>
</template>

<script lang="ts">
import { buttonStyles } from "./button.css";
import { ButtonProps, ButtonState } from "./button.types";

export default {
  name: "button",

  props: [],

  data() {
    return { loaded: false, buttonStyles };
  },

  mounted() {
    state.loaded = true;
  },

  methods: {
    _classStringToObject(str) {
      const obj = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
};
</script>