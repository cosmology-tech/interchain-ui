import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

export const myButtonVar = createVar();

const transactionProperty = "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform";

const connectButtonShapeVariants = {
  square: style({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100px",
    maxWidth: "140px",
    height: "140px",
    padding: themeVars.space[2],
  }),
  list: style({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "auto",
    height: "52px",
    padding: themeVars.space[4],
  }),
};

const connectButtonBase = style({
  fontFamily: themeVars.font.body,
  fontWeight: themeVars.fontWeight.semibold,
  borderRadius: themeVars.radii.md,
  cursor: "pointer",
  appearance: "none",
  border: "none",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: 1.2,
  display: "flex",
  selectors: {
    "&:hover": {
      transitionProperty: transactionProperty,
      transitionDuration: "200ms",
      boxShadow: "0 0 0 1px #6A66FF",
    },
    "&:focus": {
      transitionProperty: transactionProperty,
      transitionDuration: "200ms",
      boxShadow: "0 0 0 1px #6A66FF",
    },
  },
});

export const connectButtonStyle = styleVariants({
  light: [
    connectButtonBase,
    style({
      color: themeVars.colors.blackAlpha800,
      backgroundColor: themeVars.colors.gray100,
      selectors: {
        "&:hover": {
          backgroundColor: themeVars.colors.gray50,
        },
        "&:focus": {
          backgroundColor: themeVars.colors.gray50,
        },
      },
    }),
  ],
  dark: [
    connectButtonBase,
    style({
      color: themeVars.colors.whiteAlpha800,
      backgroundColor: themeVars.colors.blackAlpha500,
      selectors: {
        "&:hover": {
          backgroundColor: themeVars.colors.blackAlpha600,
        },
        "&:focus": {
          backgroundColor: themeVars.colors.blackAlpha600,
        },
      },
    }),
  ],
});

export const connectButtonVariants = recipe({
  base: {},
  variants: {
    variant: connectButtonShapeVariants,
  },
  defaultVariants: {
    variant: "square",
  },
});

export type ConnectButtonVariants = RecipeVariants<
  typeof connectButtonVariants
>;

const logoVariant = {
  square: style({
    width: themeVars.space[16],
    height: themeVars.space[16],
    marginBottom: themeVars.space[5],
  }),
  list: style({
    width: themeVars.space[12],
    height: themeVars.space[12],
    marginRight: themeVars.space[8],
  }),
};

export const logoVariants = recipe({
  base: style({
    position: "relative",
  }),
  variants: {
    variant: logoVariant,
  },
  defaultVariants: {
    variant: "square",
  },
});

const buttonTextBase = style({
  fontFamily: themeVars.font.body,
  textAlign: "left",
  fontSize: themeVars.fontSize.sm,
  fontWeight: themeVars.fontWeight.normal,
});

export const buttonTextStyle = styleVariants({
  light: [
    buttonTextBase,
    style({
      color: themeVars.colors.blackAlpha800,
    }),
  ],
  dark: [
    buttonTextBase,
    style({
      color: themeVars.colors.whiteAlpha900,
    }),
  ],
});

export const buttonTextVariants = recipe({
  base: {},
  variants: {
    variant: {
      square: {},
      list: style({
        flex: 1,
      }),
    },
  },
  defaultVariants: {
    variant: "square",
  },
});

const subLogoBase = style({
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  border: "2px solid",
  right: "-8px",
  bottom: "-8px",
  borderRadius: themeVars.radii.full,
});

export const subLogoSquare = styleVariants({
  light: [
    subLogoBase,
    style({
      backgroundColor: themeVars.colors.gray100,
      borderColor: themeVars.colors.gray100,
    }),
  ],
  dark: [
    subLogoBase,
    style({
      backgroundColor: themeVars.colors.gray700,
      borderColor: themeVars.colors.gray700,
    }),
  ],
});

export const subLogoList = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "transparent",
  borderRadius: themeVars.radii.full,
  marginRight: themeVars.space[2],
});
