import React from "react";
import cls from "clsx";

import { create } from "zustand";
import { store, Box, Button, Icon, ThemeProvider } from "../src";

const useStore = create(store);

const WithThemeDecorator = (props) => {
  const [theme, themeClass, setTheme] = useStore((state) => [
    state.theme,
    state.themeClass,
    state.setThemeMode,
  ]);

  return (
    <ThemeProvider
    // themeDefs={[
    //   {
    //     name: "custom",
    //     vars: {
    //       colors: {
    //         primary500: "#4A5568",
    //       },
    //     },
    //   },
    // ]}
    // customTheme="custom"
    // Try out custom themes
    // overrides={{
    //   button: {
    //     bg: {
    //       light: "red",
    //       dark: "blue",
    //     },
    //   },
    // }}
    >
      <div id="app-root1" className={cls("app", themeClass)}>
        <Box
          backgroundColor={theme == "dark" ? "$gray700" : "$white"}
          px="$10"
          py="$14"
          minHeight="700px"
          position="relative"
        >
          {props.children}
          <Box position="absolute" top="$4" right="$4">
            <Button
              variant="ghost"
              intent="secondary"
              size="sm"
              onClick={() => {
                if (theme === "light") {
                  return setTheme("dark");
                }
                return setTheme("light");
              }}
            >
              {theme === "dark" ? (
                <Icon name="sunLine" />
              ) : (
                <Icon name="moonLine" />
              )}
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default WithThemeDecorator;
