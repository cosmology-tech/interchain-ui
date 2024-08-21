import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import WalletConnectorInfo from "../src/ui/wallet-connector/wallet-connector-info";
import WalletConnectorFrame from "../src/ui/wallet-connector/wallet-connector-frame";
import WalletConnectorHead from "../src/ui/wallet-connector/wallet-connector-head";
import WalletConnectorStatus from "../src/ui/wallet-connector/wallet-connector-status";

// @ts-ignore
import KEPLR_ICON from "../static/keplr.png";

export const WalletConnectorInfoDefault: Story<{
  address: string;
}> = () => (
  <Box>
    <WalletConnectorInfo
      iconSrc={KEPLR_ICON}
      address="cosmos1veawurwraxw4kq30ygdpjn85jjxv67x3remaxu"
    />
  </Box>
);

WalletConnectorInfoDefault.storyName = "WalletConnectorInfo";

type WalletConnectorStatusProps = React.ComponentProps<
  typeof WalletConnectorStatus
>;

export const WalletConnectorStatusDefault: Story<{
  status: WalletConnectorStatusProps["status"];
  wallet: WalletConnectorStatusProps["wallet"];
}> = (props) => (
  <Box>
    <WalletConnectorFrame>
      <WalletConnectorHead
        hasBackButton={true}
        hasCloseButton={true}
        title="Keplr"
      />

      <WalletConnectorStatus
        status={props.status}
        wallet={{
          name: "Keplr",
          prettyName: "Keplr",
          logo: KEPLR_ICON,
          subLogo: KEPLR_ICON,
          btmLogo: KEPLR_ICON,
          mobileDisabled: false,
          downloadUrl:
            "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
          rejectMessage: "Please install Keplr extension to connect",
          originalWallet: {},
          badge: "Keplr",
          shape: "square",
        }}
        state={{
          Connecting: {
            title: "Requesting connection",
            description: "Open the Keplr extension to connect",
          },
          NotExist: {
            title: "Keplr not installed",
            description:
              "Please install the Keplr wallet first and refresh the page to connect your wallet.",
            installButtonLabel: "Install Keplr",
            popoverAction: {
              type: "reload",
              label: "Try Again",
              onClick: () => {
                console.log("Reload");
              },
            },
          },
        }}
      />
    </WalletConnectorFrame>
  </Box>
);

WalletConnectorStatusDefault.storyName = "WalletConnectorStatus";

WalletConnectorStatusDefault.args = {
  status: "Connecting",
};

WalletConnectorStatusDefault.argTypes = {
  status: {
    control: {
      type: "select",
    },
    options: [
      "Connecting",
      "NotExist",
      "Connected",
      "Disconnected",
      "Error",
      "Rejected",
    ] as WalletConnectorStatusProps["status"][],
    defaultValue: "Connecting",
  },
};
