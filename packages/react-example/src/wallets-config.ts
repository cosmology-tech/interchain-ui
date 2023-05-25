export const WalletIcons = {
  keplr:
    "https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg",
  cosmostation:
    "https://user-images.githubusercontent.com/74940804/202999324-fa2faf40-5ead-4896-b865-e97f052fc6f9.png",
  metamask:
    "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  walletConnectFill:
    "https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/7ecce5fd1974a06a031720f07304c8704db738ab/Icon/Blue%20(Default)/Icon.svg",
  walletConnect:
    "https://user-images.githubusercontent.com/545047/202090621-bb110635-f6ce-4aa0-a4e5-a03beac29bd1.svg",
};

export const mockWallets = [
  {
    name: "Keplr",
    prettyName: "Keplr",
    logo: WalletIcons.keplr,
    mobileDisabled: true,
    rejectMessage: "Request Rejected!",
  },
  {
    name: "cosmostation",
    prettyName: "Cosmostation",
    logo: WalletIcons.cosmostation,
    mobileDisabled: true,
    rejectMessage: "Request Rejected!",
  },
  {
    name: "WalletConnectKeplr",
    prettyName: "Keplr Mobile",
    logo: WalletIcons.keplr,
    mobileDisabled: false,
    subLogo: WalletIcons.walletConnect,
    rejectMessage: "Request Rejected!",
  },
  {
    name: "WalletConnectCosmostation",
    prettyName: "Cosmostation mobile",
    logo: WalletIcons.cosmostation,
    mobileDisabled: false,
    subLogo: WalletIcons.walletConnect,
    rejectMessage: "Request Rejected!",
  },
  {
    name: "meme",
    prettyName: "meme",
    logo: "https://i.imgflip.com/jl9b3.jpg",
    mobileDisabled: false,
    subLogo: WalletIcons.walletConnect,
  },
  {
    name: "luctus",
    prettyName: "lesson meow",
    logo: "https://i.imgflip.com/7n3b1.jpg",
    mobileDisabled: false,
  },
  {
    name: "sed",
    prettyName: "hacker doge",
    logo: "https://i.imgflip.com/imqvc.jpg",
    mobileDisabled: false,
  },
  {
    name: "ante",
    prettyName: "shocked",
    logo: "https://i.imgflip.com/d5wxs.jpg",
    mobileDisabled: false,
  },
  {
    name: "maurisk",
    prettyName: "doge",
    logo: "https://i.imgflip.com/chr5k.jpg",
    mobileDisabled: false,
  },
  {
    name: "aenean",
    prettyName: "selfie",
    logo: "https://i.imgflip.com/heoii.jpg",
    mobileDisabled: false,
  },
  {
    name: "at",
    prettyName: "smirking",
    logo: "https://i.imgflip.com/n1zui.jpg",
    mobileDisabled: false,
  },
  {
    name: "proin",
    prettyName: "O RLY",
    logo: "https://i.imgflip.com/1s0t4e.jpg",
    mobileDisabled: false,
  },
];
