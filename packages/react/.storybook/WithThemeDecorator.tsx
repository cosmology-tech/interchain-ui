import React from "react";
import cls from "clsx";

import { create } from "zustand";
import shallow from "zustand/shallow";
import { store, Box, ThemeProvider } from "../src";

const useStore = create(store);

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
  const [theme, themeClass] = useStore((state) => [
    state.theme,
    state.themeClass,
  ]);

  return (
    <ThemeProvider>
      <div id="app-root1" className={cls("app", themeClass)}>
        <Box
          backgroundColor={theme == "dark" ? "$gray700" : "$white"}
          px="$10"
          py="$10"
        >
          {props.children}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default WithThemeDecorator;
