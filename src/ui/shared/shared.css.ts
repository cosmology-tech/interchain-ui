import { style, createVar } from "@vanilla-extract/css";

const listBottomShadowBgVar = createVar();

export const bottomShadow = style([
  {
    vars: {
      [listBottomShadowBgVar]:
        "linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)",
    },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: {
          [listBottomShadowBgVar]:
            "linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)",
        },
      },
    },
    height: "36px",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    background: listBottomShadowBgVar,
  },
]);
