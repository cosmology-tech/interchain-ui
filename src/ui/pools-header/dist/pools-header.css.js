"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
exports.flex1 = exports.osom = exports.rewardBox = exports.baseBox = exports.dollar = exports.semocolon = exports.image = exports.mb3 = exports.container = void 0;
var css_1 = require("@vanilla-extract/css");
var sprinkles_css_1 = require("../../styles/sprinkles.css");
var themes_css_1 = require("../../styles/themes.css");
var tokens_1 = require("../../styles/tokens");
exports.container = css_1.style([
    {
        minWidth: "400px",
        marginTop: "27px",
        transition: "ease all .5s",
        flexWrap: "nowrap",
        "@media": (_a = {},
            _a["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
                flexWrap: "wrap"
            },
            _a)
    },
]);
var base = css_1.style([
    sprinkles_css_1.sprinkles({
        paddingTop: "9",
        paddingRight: "8",
        paddingBottom: "9",
        paddingLeft: "8"
    }),
    {
        display: "flex",
        alignItems: "center",
        borderRadius: "7px",
        minHeight: "92px"
    },
]);
exports.mb3 = css_1.style({
    marginBottom: "3px"
});
exports.image = css_1.style({
    width: "53px",
    height: "53px",
    marginRight: "21px",
    "@media": (_b = {},
        _b["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
            width: "40px",
            height: "40px",
            marginRight: "13px"
        },
        _b)
});
exports.semocolon = css_1.style({
    margin: "0 8px"
});
exports.dollar = css_1.style({
    marginBottom: "5px"
});
exports.baseBox = css_1.style([
    base,
    {
        backgroundColor: themes_css_1.themeVars.colors.cardBg,
        width: "234px",
        maxWidth: "234px",
        height: "fit-content",
        "@media": (_c = {},
            _c["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
                width: "calc(50% - 12px)",
                maxWidth: "calc(50% - 12px)",
                minWidth: "179px"
            },
            _c)
    },
]);
exports.rewardBox = css_1.style([
    base,
    {
        backgroundColor: themes_css_1.themeVars.colors.rewardBg,
        color: themes_css_1.themeVars.colors.rewardContent,
        width: "234px",
        maxWidth: "234px",
        height: "fit-content",
        "@media": (_d = {},
            _d["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
                width: "100%",
                maxWidth: "100%",
                minWidth: "382px"
            },
            _d)
    },
]);
exports.osom = css_1.style({
    margin: "0 14px 3px 2px"
});
exports.flex1 = css_1.style([
    sprinkles_css_1.sprinkles({
        paddingRight: "5"
    }),
    {
        flex: 1,
        overflow: "hidden"
    },
]);
