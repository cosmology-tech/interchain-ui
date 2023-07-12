import React, { useEffect } from "react";
import cls from "clsx";

import { create } from "zustand";
import shallow from "zustand/shallow";
import { store, ThemeProvider } from "@interchain-ui/react";

const useStore = create(store);

const WithThemeDecorator = (props) => {
  const [theme, themeClass] = useStore((state) => [
    state.theme,
    state.themeClass,
  ]);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#2C3137",
      }}
    >
      <ThemeProvider defaultTheme="light">
        <div id="app-root1" className={cls("app", themeClass)}>
          {props.children}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default WithThemeDecorator;
