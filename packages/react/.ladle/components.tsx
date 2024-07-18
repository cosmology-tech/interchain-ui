import * as React from "react";
import { GlobalProvider, ThemeState } from "@ladle/react";
import {
  Box,
  Text,
  Icon,
  ThemeProvider,
  ThemeProviderProps,
  createThemes,
} from "../src";
import "../src/styles/global.css";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => {
  return (
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
};

// Try out theme builder
// const themeBuilderConfig = createThemes()
//   .addSlotThemes("light", {
//     "button-primary-bgColor": "pink",
//   })
//   .addSlotThemes("dark", {
//     "button-primary-bgColor": "red",
//   })
//   .build();

function InterchainThemeProvider({
  children,
  theme,
}: {
  children?: React.ReactNode;
  theme: ThemeProviderProps["themeMode"];
}) {
  return (
    <ThemeProvider
      themeMode={theme}
      // Try out theme builder
      // themeBuilderConfig={themeBuilderConfig}
    >
      {children}
    </ThemeProvider>
  );
}
