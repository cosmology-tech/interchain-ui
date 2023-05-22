import { BaseComponentProps } from "../../models/components.model";
import type { ConnectButtonVariants } from "./connect-modal-wallet-button.css";

export interface ConnectModalWalletButtonProps extends BaseComponentProps {
  variant?: ConnectButtonVariants["variant"];
  logo: string;
  subLogo?: string;
  name: string;
  prettyName?: string;
  onClick?: any;
}

// export interface Wallet {
//   /**
//    * Wallet name.
//    */
//   name: string;
//   /**
//    * Display wallet name.
//    */
//   prettyName?: string;
//   /**
//    * Wallet icon.
//    *
//    * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
//    */
//   logo?: string | IconType;
//   /**
//    * Display sub icon.
//    *
//    * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
//    */
//   subLogo?: string | IconType;
//   /**
//    * Connect wallet by extension or wallet-connect.
//    *
//    * see `WalletMode` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L227-L230
//    */
//   mode: WalletMode;
//   /**
//    * Disabled button when on mobile or tablet.
//    */
//   mobileDisabled: boolean;
//   /**
//    * List button is displaying Square or Rectangle.
//    *
//    * see `ButtonShape` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L232-L235
//    */
//   buttonShape?: ButtonShape;
//   /**
//    * Description when rejected.
//    */
//   rejectMessage?: string;
//   /**
//    * Description when rejected.
//    *
//    * see `Downloads` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L224-L249
//    */
//   downloads?: Downloads;
//   /**
//    * Can use Chakra Style Props custom list items(buttons) style.
//    *
//    * Also can use css control, e.g,
//    * ```
//    *  {
//    *     '.my-button:hover &': {
//    *       color: 'green.500',
//    *     }
//    *  }
//    * ```
//    *
//    * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
//    *
//    * default: `SimpleDisplayWalletListItemBaseStyle(index)`
//    */
//   styleProps?: object;
//   /**
//    * A function called to handle clicked button.
//    */
//   onClick?: MouseEventHandler<HTMLDivElement>;
// };
