import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import { breakpoints } from "../../styles/tokens";

export const container = style([
  s({
    marginBottom: "10",
    marginRight: "9",
  }),
  {
    width: "752px",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "100%",
        minWidth: "400px",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
    },
  },
]);

export const contentContainer = style({
  width: "712px",
});

export const rank = style({
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      marginLeft: "-46px",
    },
  },
});

export const responsiveText = style([
  s({
    width: {
      desktop: "1/5",
      mobile: "1/3",
    },
  })
]);

export const nameContainer = style({
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      minWidth: "calc(72px + 20%)",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "calc(88px + 33.33%)",
    },
  },

})

export const imageBox = style([
  s({
    minWidth: "18",
    height: "14",
    marginRight: "8",
  }),
  {
    position: "relative",
  },
]);

export const imgBase = style([
  s({
    width: "14",
    height: "14",
  }),
  { position: "absolute" },
]);
export const image1 = style([
  imgBase,
  {
    left: 0,
  },
]);
export const image2 = style([
  imgBase,
  {
    right: 0,
  },
]);

export const smAPR = style({
  display: "none",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "flex",
    },
  },
});

export const lgAPR = style({
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "none !important",
    },
  },
});

export const onlySm = style({
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "none !important",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "flex !important",
    },
  },
});

const baseIcon = style([
  {
    width: "38px",
    height: "38px",
    cursor: "pointer"
  },
  s({
    borderRadius: "base",
  })
])
export const iconConntainer = styleVariants({
  light: [baseIcon, {
    backgroundColor: "#EEF2F8"
  }],
  dark: [baseIcon, {
    backgroundColor: "#1D2024"
  }],
})
