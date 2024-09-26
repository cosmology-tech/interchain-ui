import * as React from "react";
import { GlobalProvider, ThemeState } from "@ladle/react";
import {
  Box,
  Text,
  Icon,
  ThemeProvider,
  ThemeProviderProps,
  OverlaysManager,
  createThemes,
  ResultThemeVars,
} from "../src";
import "./reset.css";
import "../src/styles/global.css";
import { ConfigPane, ConfigChangeEvent } from "./config-pane";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => {
  const [themeBuilderConfig, setThemeBuilderConfig] = React.useState<
    ResultThemeVars | undefined
  >();
  const [prevLightVars, setPrevLightVars] = React.useState<
    Record<string, string>
  >({});
  const [prevDarkVars, setPrevDarkVars] = React.useState<
    Record<string, string>
  >({});

  const onPaneConfigChange = (event: ConfigChangeEvent) => {
    const { light, dark } = event;

    const newLightVars = {
      ...prevLightVars,
      [light.varKey]: light.varValue,
    };

    const newDarkVars = {
      ...prevDarkVars,
      [dark.varKey]: dark.varValue,
    };

    setPrevLightVars(newLightVars);
    setPrevDarkVars(newDarkVars);

    // console.log("Setting vars", newLightVars, newDarkVars);
    const config = createThemes()
      .addSlotThemes("light", {
        ...newLightVars,
      })
      .addSlotThemes("dark", {
        ...newDarkVars,
      })
      .build();

    setThemeBuilderConfig(config);
  };

  return (
    <div id="ladle-global-provider">
      <InterchainThemeProvider
        theme={globalState.theme === ThemeState.Light ? "light" : "dark"}
        themeBuilderConfig={themeBuilderConfig}
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

        <Box
          maxHeight="400px"
          overflow="auto"
          attributes={{
            id: "config-pane-container",
          }}
        />

        <OverlaysManager />

        <ConfigPane
          component={storyMeta?.component}
          onConfigChange={onPaneConfigChange}
        />
      </InterchainThemeProvider>
    </div>
  );
};

function InterchainThemeProvider({
  children,
  theme,
  themeBuilderConfig,
}: {
  children?: React.ReactNode;
  theme: ThemeProviderProps["themeMode"];
  themeBuilderConfig?: ResultThemeVars;
}) {
  return (
    <ThemeProvider themeMode={theme} themeBuilderConfig={themeBuilderConfig}>
      {children}
    </ThemeProvider>
  );
}
