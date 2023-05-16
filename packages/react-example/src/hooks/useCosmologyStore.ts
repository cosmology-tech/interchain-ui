import { create } from "zustand";
import shallow from "zustand/shallow";
import { store, UIStore } from "@cosmology-ui/react";

const useStore = create<UIStore>(store);

export const useCosmologyStore = () => {
  return useStore(
    (state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
      setTheme: state.setTheme,
    }),
    shallow
  );
};
