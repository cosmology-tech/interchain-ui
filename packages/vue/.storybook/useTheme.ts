import { ref, computed, onMounted, onUnmounted } from "vue";
import { store } from "../src/models/store";
import type { ModePreference, ThemeVariant } from "../src/models/system.model";
import type { Accent } from "../src/styles/tokens";

export function useTheme() {
  const storeState = ref(store.getState());

  const theme = computed(() => storeState.value.theme);
  const themeClass = computed(() => storeState.value.themeClass);
  const themeMode = computed(() => storeState.value.themeMode);
  const themeAccent = computed(() => storeState.value.themeAccent);

  const setTheme = (newTheme: ThemeVariant) => {
    const themeClass =
      newTheme === "dark"
        ? storeState.value.themeClasses[1]
        : storeState.value.themeClasses[0];
    store.getState().setTheme(newTheme, themeClass);
  };

  const setThemeMode = (newMode: ModePreference) => {
    store.getState().setThemeMode(newMode);
  };

  const setThemeAccent = (newAccent: Accent) => {
    store.getState().setThemeAccent(newAccent);
  };

  onMounted(() => {
    const unsubscribe = store.subscribe((state) => {
      storeState.value = state;
    });

    onUnmounted(unsubscribe);
  });

  return {
    theme,
    themeClass,
    themeMode,
    themeAccent,
    setTheme,
    setThemeMode,
    setThemeAccent,
  };
}
