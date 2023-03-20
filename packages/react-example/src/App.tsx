import cls from "clsx";
import { Button, ThemeProvider } from "@cosmology-mitosis/react";
import "@cosmology-mitosis/react/themes.css";
import { useCosmologyStore } from "./hooks/useCosmologyStore";

function App() {
  const { themeClass, setTheme } = useCosmologyStore();

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <Button>Custom button</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
