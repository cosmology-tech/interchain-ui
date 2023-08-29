import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const avatarSizeVar = createVar();
export const avatarBgVar = createVar();

export const avatarBase = style({
  display: "inline-flex",
  width: avatarSizeVar,
  height: avatarSizeVar,
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  flex: "auto 0 1px",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: themeVars.fontWeight.medium,
  borderRadius: "100%",
  selectors: {
    "&:not([data-loaded='true'])": {
      backgroundColor: avatarBgVar,
      color: themeVars.colors.text,
    },
  },
});

export const avatar = styleVariants({
  light: [
    avatarBase,
    style({
      vars: {
        [avatarBgVar]: themeVars.colors.gray200,
      },
    }),
  ],
  dark: [
    avatarBase,
    style({
      vars: {
        [avatarBgVar]: themeVars.colors.whiteAlpha300,
      },
    }),
  ],
});

export const avatarName = style({
  display: "inline-block",
  backgroundColor: "transparent",
  borderRadius: "100%",
  fontSize: `calc(${avatarSizeVar} / 2.5)`,
});

export const avatarImg = style({
  display: "inline-block",
  borderRadius: "100%",
});
