import cls from "clsx";
import { Button, ThemeProvider, Modal } from "@cosmology-mitosis/react";
import "@cosmology-mitosis/react/themes.css";
import { useCosmologyStore } from "./hooks/useCosmologyStore";

function App() {
  const { themeClass, setTheme } = useCosmologyStore();

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <Button>Custom button</Button>
      </div>

      <Modal
        id="wallet-modal"
        renderTrigger={(props: any) => <button {...props}>Open modal</button>}
        renderContent={() => <div>hello content</div>}
      />
    </ThemeProvider>
  );
}

export default App;
