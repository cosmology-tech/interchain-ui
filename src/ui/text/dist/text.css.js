"use strict";
exports.__esModule = true;
exports.variants = void 0;
var css_1 = require("@vanilla-extract/css");
var recipes_1 = require("@vanilla-extract/recipes");
var themes_css_1 = require("../../styles/themes.css");
var sprinkles_css_1 = require("../../styles/sprinkles.css");
var variant = {
    body: sprinkles_css_1.sprinkles({
        fontSize: "sm",
        fontWeight: "normal",
        lineHeight: "normal"
    }),
    heading: css_1.style({
        fontSize: "md",
        fontWeight: "semibold",
        lineHeight: "tall"
    })
};
exports.variants = recipes_1.recipe({
    base: css_1.style({
        fontFamily: themes_css_1.themeVars.font.body
    }),
    variants: {
        variant: variant,
        ellipsis: {
            "true": css_1.style({
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            })
        },
        underline: {
            "true": css_1.style({
                textDecoration: "underline"
            })
        }
    },
    defaultVariants: {
        variant: "body"
    }
});
// export type Variants = {
//   variant?: "body" | "heading";
//   ellipsis?: boolean | undefined;
//   underline?: boolean | undefined;
// };
