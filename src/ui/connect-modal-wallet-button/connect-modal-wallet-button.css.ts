import { style, createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

export const myButtonVar = createVar();

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

export const connectButtonVariants = recipe({
  base: style([
    {
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
      transitionProperty:
        "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
      transitionDuration: "200ms",
      display: "flex",
      selectors: {
        "&:hover": {
          boxShadow: "0 0 0 1px #6A66FF",
        },
        "&:focus": {
          boxShadow: "0 0 0 1px #6A66FF",
        },
      },
      "@media": {
        "(prefers-color-scheme: light)": {
          selectors: {
            "&:hover": {
              backgroundColor: themeVars.colors.gray50,
            },
            "&:focus": {
              backgroundColor: themeVars.colors.gray50,
            },
          },
        },
        "(prefers-color-scheme: dark)": {
          selectors: {
            "&:hover": {
              backgroundColor: themeVars.colors.blackAlpha600,
            },
            "&:focus": {
              backgroundColor: themeVars.colors.blackAlpha600,
            },
          },
        },
      },
    },
    s({
      color: {
        light: "blackAlpha800",
        dark: "whiteAlpha800",
      },
      backgroundColor: {
        light: "gray100",
        dark: "blackAlpha500",
      },
    }),
  ]),
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
  square: s({
    width: "16",
    height: "16",
    marginBottom: "5",
  }),
  list: s({
    width: "12",
    height: "12",
    marginRight: "8",
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

export const buttonTextVariants = recipe({
  base: style([
    {
      fontFamily: themeVars.font.body,
      textAlign: "left",
    },
    s({
      fontSize: "sm",
      fontWeight: "normal",
      color: {
        light: "blackAlpha800",
        dark: "whiteAlpha900",
      },
    }),
  ]),
  variants: {
    variant: {
      square: {},
      list: s({
        flex: 1,
      }),
    },
  },
  defaultVariants: {
    variant: "square",
  },
});

export const subLogoSquare = style([
  {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: "2px solid",
    right: "-8px",
    bottom: "-8px",
  },
  s({
    borderRadius: "full",
    backgroundColor: {
      light: "gray100",
      dark: "gray700",
    },
    borderColor: {
      light: "gray100",
      dark: "gray700",
    },
  }),
]);

export const subLogoList = style([
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  s({
    backgroundColor: "transparent",
    borderRadius: "full",
    marginRight: "2",
  }),
]);
