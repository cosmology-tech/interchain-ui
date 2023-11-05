import * as React from "react";
import cls from "clsx";
import {
  Box,
  Stack,
  Text,
  IconButton,
  ThemeProvider,
  Select,
  SelectOption,
  useTheme,
} from "../src";
import { DEFAULT_ACCENTS, Accent } from "../src/styles/tokens";
import { getAccent } from "../src/helpers/style";
import "../src/styles/global.css";

const ThemeShell = (props) => {
  const { theme, themeClass, setTheme } = useTheme();

  return (
    <div id="app-root1" className={cls("app", themeClass)}>
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
            {/* <Select
                size="sm"
                width={180}
                placeholder="Accent"
                onSelectItem={(selectedIndex) => {
                  if (selectedIndex == null) return;

                  const item = DEFAULT_ACCENTS[selectedIndex];
                  setAccent(item);
                  console.log("[Storybook root] Selected accent ", item);
                }}
              >
                {DEFAULT_ACCENTS.map((accent) => (
                  <SelectOption label={`Accent ${accent}`} key={accent}>
                    <Stack direction="horizontal" space="$4">
                      <Box
                        backgroundColor={getAccent(accent, theme)}
                        height="$8"
                        width="$8"
                        borderRadius="$full"
                      />
                      <Text fontSize="$sm">{accent}</Text>
                    </Stack>
                  </SelectOption>
                ))}
              </Select> */}
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

const WithThemeDecorator = (props) => {
  const [accent, setAccent] = React.useState<Accent>("blue");

  return (
    <ThemeProvider
      accent={accent}
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
      <ThemeShell {...props} />
    </ThemeProvider>
  );
};

export default WithThemeDecorator;
