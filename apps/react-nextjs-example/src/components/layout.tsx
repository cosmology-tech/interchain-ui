import * as React from "react";
import {
  Box,
  Button,
  Text,
  ThemeProvider,
  useTheme,
} from "@interchain-ui/react";
import clx from "clsx";
import {
  cosmologyDarkTheme,
  cosmologyLightTheme,
  CustomTheme,
  overrides,
} from "@/styles";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { getThemeRef, theme, toggleColorMode } = useTheme();

  return (
    <ThemeProvider
      themeDefs={[cosmologyLightTheme, cosmologyDarkTheme]}
      customTheme={CustomTheme[theme]}
      themeMode={theme}
      overrides={overrides}
    >
      <Box
        ref={getThemeRef}
        bg="$background"
        className={clx("p-24", inter.className)}
      >
        <Button
          onClick={() => {
            console.log("toggle color mode");
            toggleColorMode();
          }}
          attributes={{
            type: "button",
          }}
        >
          {theme === "light" ? "Light" : "Dark"} mode
        </Button>

        <Box bg="$cardBg" borderRadius="$lg" p="$10" my="$12">
          <Text>This box bg should reflect current theme</Text>
        </Box>
        {children}
      </Box>
    </ThemeProvider>
  );
};
