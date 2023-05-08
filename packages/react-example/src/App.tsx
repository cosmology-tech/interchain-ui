import cls from "clsx";
import { Button, ThemeProvider, Box, Text } from "@cosmology-mitosis/react";
import { useCosmologyStore } from "./hooks/useCosmologyStore";

function App() {
  const { themeClass, setTheme } = useCosmologyStore();

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <Box p="15" backgroundColor="white">
          <Text>Demo</Text>

          <Button leftIcon="walletFilled">Custom button</Button>
        </Box>
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
