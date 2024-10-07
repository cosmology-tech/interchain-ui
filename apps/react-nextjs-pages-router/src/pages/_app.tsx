import "@/styles/globals.css";
import "@interchain-ui/react/styles";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { ThemeProvider, Box, IconButton, useTheme } from "@interchain-ui/react";
import type { AppProps } from "next/app";
import { darkTheme, lightTheme, CustomTheme } from "@/ui/custom-theme";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, themeClass, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ThemeProvider
      themeDefs={[lightTheme, darkTheme]}
      customTheme={CustomTheme[theme]}
    >
      <div className={clsx("app", themeClass)}>
        <Box
          position="relative"
          backgroundColor={theme == "dark" ? "$gray700" : "$white"}
        >
          <Box
            // Note: This is a hack to prevent a flash of unstyled background on Safari
            // For some reasons the background color or any color css vars are not applied on the first render
            bg={isMounted ? "$background" : "transparent"}
            transition="all 0.3s ease"
            attributes={{
              id: "layout-container",
            }}
          >
            <Component {...pageProps} />
          </Box>

          <Box position="absolute" top="$4" right="$6">
            <IconButton
              variant="outlined"
              intent="tertiary"
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
}
