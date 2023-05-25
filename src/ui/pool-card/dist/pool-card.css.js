"use strict";
var _a;
exports.__esModule = true;
exports.divider = exports.container = void 0;
var css_1 = require("@vanilla-extract/css");
var sprinkles_css_1 = require("../../styles/sprinkles.css");
var tokens_1 = require("../../styles/tokens");
exports.container = css_1.style([
    sprinkles_css_1.sprinkles({
        backgroundColor: "cardBg",
        paddingTop: "10",
        paddingBottom: "10",
        paddingLeft: "10",
        paddingRight: "10"
    }),
    {
        borderRadius: "7px",
        height: "fit-content",
        "@media": (_a = {},
            _a["screen and (min-width: " + tokens_1.breakpoints.tablet + "px)"] = {
                width: "236px"
            },
            _a["screen and (max-width: " + tokens_1.breakpoints.tablet + "px)"] = {
                width: "100%",
                minWidth: "236px"
            },
            _a)
    },
]);
exports.divider = css_1.styleVariants({
    light: {
        backgroundColor: "#D1D6DD"
    },
    dark: {
        backgroundColor: "##434B55"
    }
});
