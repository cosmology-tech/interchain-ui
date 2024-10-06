import "@/styles/globals.css";
import "@interchain-ui/react/styles";
import clsx from "clsx";
import { ThemeProvider, Box, IconButton, useTheme } from "@interchain-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, themeClass, setTheme } = useTheme();

  return (
    <ThemeProvider>
      <div className={clsx("app", themeClass)}>
        <Box
          position="relative"
          backgroundColor={theme == "dark" ? "$gray700" : "$white"}
        >
          <Component {...pageProps} />

          <Box position="absolute" top="$4" right="$6">
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
}
