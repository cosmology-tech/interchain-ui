"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var sprinkles_css_1 = require("../../styles/sprinkles.css");
var box_1 = require("../box");
var Stack_1 = require("../Stack");
var Text_1 = require("../Text");
var store_1 = require("../../models/store");
var styles = require("./pools-header.css");
function PoolsHeader(props) {
    var state = mitosis_1.useStore({
        theme: ""
    });
    var cleanupRef = mitosis_1.useRef(null);
    mitosis_1.onMount(function () {
        state.theme = store_1.store.getState().theme;
        cleanupRef = store_1.store.subscribe(function (newState, prevState) {
            state.theme = newState.theme;
        });
    });
    mitosis_1.onUnMount(function () {
        if (typeof cleanupRef === "function")
            cleanupRef();
    });
    // image
    // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
    //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    //         "theme": {
    //           "primary_color_hex": "#5c09a0"
    //         }
    // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
    //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
    function Semocolon() {
        return (React.createElement(Text_1["default"], { className: styles.semocolon, as: "span", color: "tip", weight: "semibold", size: "4xl" }, ":"));
    }
    return (React.createElement(box_1["default"], null,
        React.createElement(Text_1["default"], { color: "content", size: "xl", weight: "semibold" }, "Liquidity Pools"),
        React.createElement(Stack_1["default"], { className: styles.container, space: "10" },
            React.createElement(box_1["default"], { className: styles.baseBox },
                React.createElement(Stack_1["default"], { className: sprinkles_css_1.sprinkles({ overflow: "hidden" }), align: "center" },
                    React.createElement("img", { className: styles.image, src: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg" }),
                    React.createElement(Stack_1["default"], { className: styles.flex1, direction: "column", justify: "center", lineHeight: "shorter" },
                        React.createElement(Text_1["default"], { color: "tip", weight: "semibold", className: styles.mb3 }, "OSMO Price"),
                        React.createElement(Stack_1["default"], { align: "flex-end" },
                            React.createElement(Text_1["default"], { className: styles.dollar, color: "content", weight: "semibold", lineHeight: "shorter" }, "$"),
                            React.createElement(Text_1["default"], { flex: 1, color: "content", size: "4xl", weight: "semibold", wordBreak: "break-word" }, props.price))))),
            React.createElement(box_1["default"], { className: styles.baseBox },
                React.createElement(Stack_1["default"], { direction: "column", justify: "center" },
                    React.createElement(Text_1["default"], { color: "tip", weight: "semibold", className: styles.mb3 }, "Reward distribution in"),
                    React.createElement(Text_1["default"], { color: "content", weight: "semibold", size: "4xl", wordBreak: "break-word" },
                        "12 ",
                        React.createElement(Semocolon, null),
                        " 19 ",
                        React.createElement(Semocolon, null),
                        " 48"))),
            React.createElement(box_1["default"], { className: styles.rewardBox },
                React.createElement(Stack_1["default"], { direction: "column", justify: "center" },
                    React.createElement(Text_1["default"], { className: styles.mb3, color: "rewardContent", weight: "semibold" }, "Yesterdays rewards"),
                    React.createElement(Stack_1["default"], { align: "flex-end" },
                        React.createElement(Text_1["default"], { color: "rewardContent", size: "4xl", weight: "semibold" }, props.rewards),
                        React.createElement(Text_1["default"], { className: styles.osom, color: "rewardContent", weight: "semibold" }, "OSMO"),
                        React.createElement(Text_1["default"], { className: styles.mb3, color: "rewardContent" }, props.$rewards)))))));
}
exports["default"] = PoolsHeader;
