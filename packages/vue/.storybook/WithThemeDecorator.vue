<template>
  <ThemeProvider>
    <div id="app-root1" :class="['app', themeClass]">
      <Box
        :backgroundColor="theme === 'dark' ? '$gray700' : '$white'"
        px="$10"
        py="$16"
        minHeight="700px"
        position="relative"
      >
        <slot></slot>
        <Box position="absolute" top="$4" right="$6">
          <Stack
            direction="horizontal"
            space="$4"
            :attributes="{
              p: '$2',
              alignItems: 'center',
            }"
          >
            <IconButton
              variant="ghost"
              intent="secondary"
              size="sm"
              :icon="theme === 'dark' ? 'sunLine' : 'moonLine'"
              @click="toggleTheme"
            />
          </Stack>
        </Box>
      </Box>
    </div>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ThemeProvider, Box, Stack, IconButton } from "../src";
import { useTheme } from "./useTheme";
import "../src/styles/global.css";

const accent = ref("blue");
const { theme, themeClass, setTheme } = useTheme();

const toggleTheme = () => {
  console.log("toggleTheme", theme.value);
  setTheme(theme.value === "light" ? "dark" : "light");
};
</script>
