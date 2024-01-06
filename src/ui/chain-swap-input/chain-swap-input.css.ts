import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { breakpoints } from "../../styles/tokens";
import { transferItemRootContainer } from "../transfer-item/transfer-item.css";

export const container = style({
  display: "block",
});

export const chainSwapInputBase = style({
  display: "block",
  border: "none",
  outline: "none",
  padding: 0,
  height: "auto",
  backgroundColor: "transparent",
  fontFamily: themeVars.font.body,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  color: themeVars.colors.textPlaceholder,
  selectors: {
    [`&[data-input-value="true"]`]: {
      color: themeVars.colors.text,
    },
    "&:focus": {
      color: themeVars.colors.text,
    },
  },
});

export const chainSwapInput = styleVariants({
  md: [
    chainSwapInputBase,
    style({
      maxWidth: "100px",
      maxHeight: themeVars.space[11],
      fontSize: themeVars.fontSize["lg"],
      fontWeight: themeVars.fontWeight.semibold,
      "@container": {
        [`${transferItemRootContainer} (min-width: 350px)`]: {
          maxWidth: "160px",
        },
      },
      "@supports": {
        [`not (container-type: inline-size)`]: {
          "@media": {
            [`screen and (min-width: ${breakpoints.mdMobile}px)`]: {
              fontSize: themeVars.fontSize["2xl"],
              maxWidth: "160px",
            },
          },
        },
      },
    }),
  ],
  sm: [
    chainSwapInputBase,
    style({
      maxWidth: "100px",
      maxHeight: themeVars.space[11],
      fontSize: themeVars.fontSize["lg"],
      fontWeight: themeVars.fontWeight.semibold,
      "@container": {
        [`${transferItemRootContainer} (min-width: 350px)`]: {
          maxWidth: "160px",
        },
      },
      "@supports": {
        [`not (container-type: inline-size)`]: {
          "@media": {
            [`screen and (min-width: ${breakpoints.mdMobile}px)`]: {
              fontSize: themeVars.fontSize["2xl"],
              maxWidth: "160px",
            },
          },
        },
      },
    }),
  ],
});

export const logoMd = style({
  maxWidth: "50px",
  maxHeight: "50px",
  "@container": {
    [`${transferItemRootContainer} (min-width: 0px)`]: {
      width: "28px",
      height: "28px",
    },
    [`${transferItemRootContainer} (min-width: 284px)`]: {
      width: "50px",
      height: "50px",
    },
  },
  "@supports": {
    [`not (container-type: inline-size)`]: {
      "@media": {
        [`screen and (min-width: ${breakpoints.mobile}px)`]: {
          width: "28px",
          height: "28px",
        },
        [`screen and (min-width: ${breakpoints.mdMobile}px)`]: {
          width: "50px",
          height: "50px",
        },
      },
    },
  },
});

export const logoSm = style({
  width: "28px",
  height: "28px",
});

const logoBase = style({
  display: "block",
  borderRadius: "50%",
  background: themeVars.colors.skeletonBg,
});

export const chainSwapLogo = styleVariants({
  md: [logoBase, logoMd],
  sm: [logoBase, logoSm],
});
