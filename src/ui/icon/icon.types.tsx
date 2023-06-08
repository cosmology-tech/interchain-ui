import { BaseComponentProps } from "../../models/components.model";
import { Sprinkles } from "../../styles/sprinkles.css";

type IconName =
  | "walletFilled"
  | "chevronRight"
  | "closeFilled"
  | "copy"
  | "checkboxCircle"
  | "chromeBrowser"
  | "verticalMore"
  | "arrowDownS"
  | "arrowUpS"
  | "mobileWallet"
  | "mobileWalletCircle"
  | "restart";

export interface IconProps extends BaseComponentProps {
  name: IconName;
  title?: string;
  size?: Sprinkles["fontSize"];
  color?: Sprinkles["color"];
}
