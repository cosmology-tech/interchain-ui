import cls from "clsx";
import {
  Button,
  ThemeProvider,
  Box,
  Stack,
  Text,
  ConnectModal,
  ClipboardCopyText,
  ConnectModalStatus,
  ComboboxItem,
} from "@cosmology-ui/react";
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
  const { themeClass, setTheme } = useCosmologyStore();
  const [status, setStatus] = useState<ConnStatus>("disconnected");

  return (
    <ThemeProvider>
      <div id="app-root" className={cls("app", themeClass)}>
        <Box height="viewHeight" p="15" backgroundColor="white">
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
                <Button intent="secondary">Custom button</Button>
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
              <div
                style={{
                  marginTop: "20px",
                  padding: "5px",
                  backgroundColor: "white",
                }}
              >
                <Text py="4">Combobox</Text>

                <Stack space="2" direction="column">
                  <ComboboxItem>Item #1</ComboboxItem>
                  <ComboboxItem>Item #2</ComboboxItem>
                  <ComboboxItem isActive>Item #3 (Active)</ComboboxItem>
                  <ComboboxItem>Item #4</ComboboxItem>
                  <ComboboxItem>Item #5</ComboboxItem>
                  <ComboboxItem>Item #6</ComboboxItem>
                </Stack>
              </div>
            </Stack>

            <Stack space="4" direction="column">
              <Text>Connect Modal</Text>

              {/* <Stack direction="column" space="6">
                <ConnectModalWalletButton
                  variant="square"
                  name="Keplr"
                  logo="https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg"
                  onClick={() => console.log("hello")}
                />

                <ConnectModalWalletButton
                  variant="list"
                  name="Keplr"
                  logo="https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg"
                  onClick={() => console.log("hello")}
                />
              </Stack> */}

              <ConnectModal wallets={mockWallets} status={status}>
                <div
                  style={{
                    outline: "1px dashed red",
                    padding: "8px",
                    marginTop: "20px",
                  }}
                >
                  <p
                    style={{
                      color: "red",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    DEBUG ONLY
                  </p>
                  <Select
                    options={allStatuses}
                    onChange={(newValue) => {
                      if (newValue?.value) {
                        setStatus(
                          (newValue?.value ?? "disconnected") as ConnStatus
                        );
                      }
                    }}
                  />
                </div>
              </ConnectModal>

              {/* <ConnectModalStatus
                wallet={mockWallets[0]}
                status="connected"
                bottomLink="https://www.google.com"
                connectedInfo={{
                  name: "David Dave Ruppert",
                  avatarUrl:
                    "https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg",
                  address: "cosmos1veawurwraxw4kq30ygdpjn85jjxv67x3remaxu",
                }}
                errorInfo={{
                  message:
                    "Seems something went wrong :(\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui.",
                }}
              /> */}
            </Stack>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
