import cls from "clsx";
import { Button, ThemeProvider, Box } from "@cosmology-mitosis/react";
import "@cosmology-mitosis/react/themes.css";
import { useCosmologyStore } from "./hooks/useCosmologyStore";

function App() {
  const { themeClass, setTheme } = useCosmologyStore();

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "rgb(15 23 42)",
          }}
        >
          <Box mx="2" my="4" p="15">
            <Button>Custom button</Button>
          </Box>
        </div>
      </div>

      {/* <Modal
        id="wallet-modal"
        renderTrigger={(props: any) => <button {...props}>Open modal</button>}
        renderContent={() => <div>hello content</div>}
      /> */}
    </ThemeProvider>
  );
}

export default App;
