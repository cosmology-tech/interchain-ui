"use strict";
var _a, _b, _c, _d, _e, _f;
exports.__esModule = true;
exports.iconConntainer = exports.onlySm = exports.lgAPR = exports.smAPR = exports.image2 = exports.image1 = exports.imgBase = exports.imageBox = exports.nameContainer = exports.responsiveText = exports.rank = exports.contentContainer = exports.container = void 0;
var css_1 = require("@vanilla-extract/css");
var sprinkles_css_1 = require("../../styles/sprinkles.css");
var tokens_1 = require("../../styles/tokens");
exports.container = css_1.style([
    sprinkles_css_1.sprinkles({
        marginBottom: "10",
        marginRight: "9"
    }),
    {
        width: "752px",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        "@media": (_a = {},
            _a["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
                width: "100%",
                minWidth: "400px",
                flexWrap: "wrap",
                justifyContent: "space-between"
            },
            _a)
    },
]);
exports.contentContainer = css_1.style({
    width: "712px"
});
exports.rank = css_1.style({
    "@media": (_b = {},
        _b["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            marginLeft: "-46px"
        },
        _b)
});
exports.responsiveText = css_1.style([
    sprinkles_css_1.sprinkles({
        width: {
            desktop: "1/5",
            mobile: "1/3"
        }
    })
]);
exports.nameContainer = css_1.style({
    "@media": (_c = {},
        _c["screen and (min-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            minWidth: "calc(72px + 20%)"
        },
        _c["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            width: "calc(88px + 33.33%)"
        },
        _c)
});
exports.imageBox = css_1.style([
    sprinkles_css_1.sprinkles({
        minWidth: "18",
        height: "14",
        marginRight: "8"
    }),
    {
        position: "relative"
    },
]);
exports.imgBase = css_1.style([
    sprinkles_css_1.sprinkles({
        width: "14",
        height: "14"
    }),
    { position: "absolute" },
]);
exports.image1 = css_1.style([
    exports.imgBase,
    {
        left: 0
    },
]);
exports.image2 = css_1.style([
    exports.imgBase,
    {
        right: 0
    },
]);
exports.smAPR = css_1.style({
    display: "none",
    "@media": (_d = {},
        _d["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            display: "flex"
        },
        _d)
});
exports.lgAPR = css_1.style({
    "@media": (_e = {},
        _e["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            display: "none !important"
        },
        _e)
});
exports.onlySm = css_1.style({
    "@media": (_f = {},
        _f["screen and (min-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            display: "none !important"
        },
        _f["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            display: "flex !important"
        },
        _f)
});
var baseIcon = css_1.style([
    {
        width: "38px",
        height: "38px",
        cursor: "pointer"
    },
    sprinkles_css_1.sprinkles({
        borderRadius: "base"
    })
]);
exports.iconConntainer = css_1.styleVariants({
    light: [baseIcon, {
            backgroundColor: "#EEF2F8"
        }],
    dark: [baseIcon, {
            backgroundColor: "#1D2024"
        }]
});
