import "@interchain-ui/react/dist/interchain-ui-kit-react.cjs.css";
import cls from "clsx";
import {
  Button,
  ThemeProvider,
  Box,
  Stack,
  Text,
  ConnectModal,
  QRCode,
  ClipboardCopyText,
  ConnectModalStatus,
  ConnectModalQRCode,
  ConnectModalWalletButton,
  ConnectModalHead,
} from "@interchain-ui/react";

import { FaAndroid } from "react-icons/fa";
import { useCosmologyStore } from "./hooks/useCosmologyStore";
import { mockWallets } from "./wallets-config";
import { useState } from "react";
import Select from "react-select";

type ConnStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "notExist"
  | "rejected"
  | "error";

const allStatuses = [
  "disconnected",
  "connecting",
  "connected",
  "notExist",
  "rejected",
  "error",
].map((status) => ({
  value: status,
  label: status,
}));

function App() {
  const { themeClass, setTheme, theme } = useCosmologyStore();
  const [status, setStatus] = useState<ConnStatus>("disconnected");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <Box height="viewHeight" p="15" backgroundColor={"background"}>
          <Text marginBottom="10" size="xl">
            prefers-color-scheme: {theme}
          </Text>

          <div
            style={{
              display: "grid",
              maxWidth: "700px",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            }}
          >
            <Stack space="4" direction="column">
              <Text>Buttons</Text>

              <div>
                <Button onClick={() => console.log("heyy")}>Connect</Button>
              </div>
              <div>
                <Button leftIcon="walletFilled">Connect</Button>
              </div>
              <div>
                <Button rightIcon="copy">Copy</Button>
              </div>
              <div>
                <Button intent="secondary" leftIcon="restart">
                  Custom button
                </Button>
              </div>
              <div>
                <Button intent="secondary" leftIcon="walletFilled">
                  Connect
                </Button>
              </div>
              <div>
                <Button
                  intent="primary"
                  variant="outlined"
                  leftIcon="chromeBrowser"
                >
                  Connect
                </Button>
              </div>
            </Stack>

            <Stack space="4" direction="column">
              <Text>Connect Modal</Text>

              <Stack direction="column" space="6">
                <ConnectModalWalletButton
                  variant="square"
                  isMobile={true}
                  name="Keplr"
                  logo="https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg"
                  onClick={() => console.log("hello")}
                />

                <ConnectModalWalletButton
                  variant="list"
                  isMobile={true}
                  name="Keplr"
                  logo="https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg"
                  onClick={() => console.log("hello")}
                />
              </Stack>

              <Button onClick={() => setIsOpen(true)}>Open modal</Button>

              {/* <ConnectModal
                isOpen={isOpen}
                onClose={onClose}
                header={
                  <ConnectModalHead
                    title="Hello"
                    hasCloseButton
                    hasBackButton
                  />
                }
              >
                <ConnectModalQRCode
                  status="Error"
                  description="Hello there"
                  link="https://google.com"
                  errorTitle={"Seems something went wrong :("}
                  errorDesc={
                    "Dolor lorem ipsum sit amet consectetur adipisicing elit. Eos necessitatibus eveniet ipsa itaque provident recusandae exercitationem numquam aperiam officia facere."
                  }
                />
              </ConnectModal> */}

              {/* <QRCode
                size={320}
                value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
                level="L"
                includeMargin={false}
                fgColor="black"
                bgColor="white"
              /> */}

              <ConnectModalStatus
                wallet={mockWallets[0]}
                status="NotExist"
                contentHeader="Please install wallet"
                installIcon={<FaAndroid />}
              />
            </Stack>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
