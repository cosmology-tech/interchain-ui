import cls from "clsx";
import {
  Button,
  ThemeProvider,
  Box,
  Stack,
  Text,
} from "@cosmology-mitosis/react";
import { useCosmologyStore } from "./hooks/useCosmologyStore";

function App() {
  const { themeClass, setTheme } = useCosmologyStore();

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <Box p="15" backgroundColor="white">
          <Stack space="4" direction="column">
            <Text>Buttons</Text>

            <div>
              <Button>Connect</Button>
            </div>
            <div>
              <Button leftIcon="walletFilled">Connect</Button>
            </div>
            <div>
              <Button rightIcon="closeFilled">Close</Button>
            </div>
            <div>
              <Button intent="secondary">Custom button</Button>
            </div>
            <div>
              <Button intent="secondary" leftIcon="walletFilled">
                Connect
              </Button>
            </div>
          </Stack>
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
