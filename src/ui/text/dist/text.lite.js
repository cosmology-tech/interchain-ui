"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var box_1 = require("../box");
var text_css_1 = require("./text.css");
function Text(props) {
    mitosis_1.useDefaultProps({
        color: "gray700"
    });
    return (React.createElement(box_1["default"], { as: props.as, className: text_css_1.variants({
            variant: props.variant,
            ellipsis: props.ellipsis ? true : undefined,
            underline: props.underline ? true : undefined
        }) + " " + props.className, color: props.color, fontSize: props.size, fontWeight: props.weight, letterSpacing: props.letterSpacing, lineHeight: props.lineHeight, textAlign: props.align, textTransform: props.transform, whiteSpace: props.whiteSpace, wordBreak: props.wordBreak, marginTop: props.marginTop, marginRight: props.marginRight, marginLeft: props.marginLeft, marginBottom: props.marginBottom }, props.children));
}
exports["default"] = Text;
