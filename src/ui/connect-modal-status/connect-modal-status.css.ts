import {
  style,
  keyframes,
  styleVariants,
  createVar,
} from "@vanilla-extract/css";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";

const logoFrameColorDisconnectedVar = createVar();
const logoFrameColorConnectingVar = createVar();
const logoFrameColorNotExistVar = createVar();

const modalStatusContainerBase = style([
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box"
  },
  s({
    fontFamily: "body",
    px: "8",
    marginTop: "12",
    paddingBottom: "0",
  }),
]);

export const modalStatusContainer = styleVariants({
  light: [
    modalStatusContainerBase,
    s({
      backgroundColor: "white",
    }),
  ],
  dark: [
    modalStatusContainerBase,
    s({
      backgroundColor: "gray700",
    }),
  ],
});

export const statusLogo = style([
  {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
  },
  s({
    width: "19",
    height: "19",
  }),
]);

const disconnectedLogoFrameBase = style({
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: logoFrameColorDisconnectedVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
});

export const disconnectedLogoFrame = styleVariants({
  light: [
    disconnectedLogoFrameBase,
    style({
      vars: {
        [logoFrameColorDisconnectedVar]: themeVars.colors.orange300,
      },
    }),
  ],
  dark: [
    disconnectedLogoFrameBase,
    style({
      vars: {
        [logoFrameColorDisconnectedVar]: themeVars.colors.orange400,
      },
    }),
  ],
});

const disconnectedDescBase = s({
  fontWeight: "semibold",
  marginBottom: "7",
});

export const disconnectedDesc = styleVariants({
  light: [
    disconnectedDescBase,
    s({
      color: "orange300",
    }),
  ],
  dark: [
    disconnectedDescBase,
    s({
      color: "orange500",
    }),
  ],
});

export const statusLogoImage = s({
  px: "7",
  py: "7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const statusLogoImageSvg = s({
  width: "19",
  height: "19",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const rotateAnim = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const connectingLogoFrameBase = style({
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  borderLeftColor: logoFrameColorConnectingVar,
  borderRightColor: logoFrameColorConnectingVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
  animationName: rotateAnim,
  animationDuration: "3s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
});

export const connectingLogoFrame = styleVariants({
  light: [
    connectingLogoFrameBase,
    style({
      vars: {
        [logoFrameColorConnectingVar]: themeVars.colors.purple300,
      },
    }),
  ],
  dark: [
    connectingLogoFrameBase,
    style({
      vars: {
        [logoFrameColorConnectingVar]: themeVars.colors.purple400,
      },
    }),
  ],
});

const connectingHeaderBase = s({
  marginBottom: "1",
  fontSize: "md",
  fontWeight: "semibold",
});

export const connectingHeader = styleVariants({
  light: [
    connectingHeaderBase,
    s({
      color: "gray700",
    }),
  ],
  dark: [
    connectingHeaderBase,
    s({
      color: "white",
    }),
  ],
});

const notExistLogoFrameBase = style({
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: logoFrameColorNotExistVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
});

export const notExistLogoFrame = styleVariants({
  light: [
    notExistLogoFrameBase,
    style({
      vars: {
        [logoFrameColorNotExistVar]: themeVars.colors.red300,
      },
    }),
  ],
  dark: [
    notExistLogoFrameBase,
    style({
      vars: {
        [logoFrameColorNotExistVar]: themeVars.colors.red400,
      },
    }),
  ],
});

export const errorDescription = style([
  {
    lineHeight: 1.3,
    opacity: 0.7,
    whiteSpace: "pre-line",
    overflowY: "scroll",
    paddingInlineStart: themeVars.space[8],
    paddingInlineEnd: themeVars.space[8],
    scrollbarWidth: "none",
    selectors: {
      "&::-webkit-scrollbar": {
        display: "none" /* Safari and Chrome */,
      },
    },
  },
  s({
    paddingTop: "2",
    paddingBottom: "2",
    marginBottom: "8",
    fontSize: "sm",
    maxHeight: "22",
  }),
]);

export const widthContainer = s({
  width: "full",
  paddingLeft: "8",
  paddingRight: "8",
});

const connectedInfoBase = s({
  fontSize: "md",
  fontWeight: "semibold",
  marginLeft: "4",
});

export const connectedInfo = styleVariants({
  light: [
    connectedInfoBase,
    s({
      color: "gray700",
    }),
  ],
  dark: [
    connectedInfoBase,
    s({
      color: "white",
    }),
  ],
});

export const dangerText = styleVariants({
  light: [s({ fontWeight: "semibold", marginBottom: "2", color: "red300" })],
  dark: [s({ fontWeight: "semibold", marginBottom: "2", color: "red400" })],
});

const descBase = s({
  fontSize: "sm",
  marginBottom: "4",
  fontWeight: "normal",
  textAlign: "center",
});

export const desc = styleVariants({
  light: [descBase, s({ color: "gray600" })],
  dark: [descBase, s({ color: "whiteAlpha900" })],
});
