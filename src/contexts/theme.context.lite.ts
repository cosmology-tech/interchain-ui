import { createContext } from "@builder.io/mitosis";

interface ThemeContext {
  colorScheme: "light" | "dark";
}

export default createContext({
  name: "ThemeContext",
  content: null,
  context: {
    colorScheme: "dark",
  } satisfies ThemeContext,
  state: {},
});
