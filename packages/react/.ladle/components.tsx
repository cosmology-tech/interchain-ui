import * as React from "react";
import clx from "clsx";
import { Box, Stack, IconButton, useTheme } from "../src";
import type { GlobalProvider } from "@ladle/react";

const ThemeShell = (props: { children?: React.ReactNode }) => {
  const { theme, themeClass, setTheme } = useTheme();

  return (
    <div id="ladle-app-root" className={clx("ladle-app-root", themeClass)}>
      <Box
        backgroundColor={theme == "dark" ? "$gray700" : "$white"}
        px="$10"
        py="$16"
        minHeight="700px"
        position="relative"
      >
        {props.children}

        <Box position="absolute" top="$4" right="$6">
          <Stack
            direction="horizontal"
            space="$4"
            attributes={{
              p: "$2",
              alignItems: "center",
            }}
          >
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
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => <ThemeShell>{children}</ThemeShell>;
