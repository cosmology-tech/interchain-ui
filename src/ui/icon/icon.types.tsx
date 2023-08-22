import { BaseComponentProps } from "../../models/components.model";
import { Sprinkles } from "../../styles/rainbow-sprinkles.css";

type IconName =
  | "walletFilled"
  | "chevronRight"
  | "closeFilled"
  | "close"
  | "copy"
  | "checkboxCircle"
  | "chromeBrowser"
  | "verticalMore"
  | "arrowDownS"
  | "arrowUpS"
  | "mobileWallet"
  | "mobileWalletCircle"
  | "restart"
  | "arrowLeftSLine"
  | "add"
  | "subtract"
  | "arrowRightLine"
  | "timeLine"
  | "jaggedCheck"
  | "priceTagLine"
  | "sendLine"
  | "fireLine"
  | "uploadLine"
  | "coinsLine"
  | "shoppingBagLine"
  | "informationLine"
  | "arrowDownLine"
  | "arrowUpDownLine"
  | "arrowLeftRightLine"
  | "settingFill"
  | "moonLine"
  | "sunLine"
  | "arrowDropDown"
  | "settingFill"
  | "loaderLine";

export interface IconProps extends BaseComponentProps {
  name: IconName;
  title?: string;
  size?: Sprinkles["fontSize"];
  color?: Sprinkles["color"];
  attributes?: Sprinkles;
}
