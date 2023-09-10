import React from "react";
import cls from "clsx";
import { Box, IconButton, ThemeProvider, useTheme } from "../src";
import "../src/styles/global.css";

const WithThemeDecorator = (props) => {
  const { theme, themeClass, setTheme } = useTheme();

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
            <IconButton
              variant="ghost"
              intent="secondary"
              size="sm"
              icon={theme === "dark" ? "sunLine" : "moonLine"}
              onClick={() => {
                if (theme === "light") {
                  return setTheme("dark");
                }
                return setTheme("light");
              }}
            />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default WithThemeDecorator;
