import { create } from "zustand";
import shallow from "zustand/shallow";
import { store } from "@cosmology-mitosis/react";

const useStore = create(store);

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
