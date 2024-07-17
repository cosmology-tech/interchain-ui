import * as React from "react";
import { GlobalProvider, ThemeState } from "@ladle/react";
import { Box, Text, Icon, ThemeProvider, ThemeProviderProps } from "../src";
import "../src/styles/global.css";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => (
  <div id="ladle-global-provider">
    <InterchainThemeProvider
      theme={globalState.theme === ThemeState.Light ? "light" : "dark"}
    >
      <Box
        display="flex"
        gap="$4"
        justifyContent="flex-end"
        alignItems="center"
        color="$text"
        paddingBottom="$6"
      >
        <Text as="h1">Theme: {globalState.theme}</Text>

        <Icon
          size="sm"
          name={globalState.theme === "dark" ? "sunLine" : "moonLine"}
        />
      </Box>

      {children}
    </InterchainThemeProvider>
  </div>
);

function InterchainThemeProvider({
  children,
  theme,
}: {
  children?: React.ReactNode;
  theme: ThemeProviderProps["themeMode"];
}) {
  return <ThemeProvider themeMode={theme}>{children}</ThemeProvider>;
}
