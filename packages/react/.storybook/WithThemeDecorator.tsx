import React from "react";
import cls from "clsx";

import { create } from "zustand";
import shallow from "zustand/shallow";
import { store, UIStore, ThemeProvider } from "../src";

const useStore = create<UIStore>(store);

const useCosmologyStore = () => {
  return useStore(
    (state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
      setTheme: state.setTheme,
    }),
    shallow
  );
};

const WithThemeDecorator = (props) => {
  const { themeClass, setTheme } = useCosmologyStore();
  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        {props.children}
      </div>
    </ThemeProvider>
  );
};

export default WithThemeDecorator;
