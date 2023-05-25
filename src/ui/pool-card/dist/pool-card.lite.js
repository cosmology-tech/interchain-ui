"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var store_1 = require("../../models/store");
var stack_1 = require("../stack");
var box_1 = require("../box");
var text_1 = require("../text");
var pool_name_1 = require("../pool/components/pool-name");
var styles = require("./pool-card.css");
function PoolCard(props) {
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
    return (React.createElement(stack_1["default"], { space: "6", className: styles.container, direction: "column", justify: "center" },
        React.createElement(pool_name_1["default"], { token1: props.token1, token2: props.token2 }),
        React.createElement(stack_1["default"], { justify: "space-between" },
            React.createElement(text_1["default"], { color: "content" }, "APR"),
            React.createElement(text_1["default"], { color: "content", size: "2xl", weight: "semibold", marginLeft: "4", wordBreak: "break-word" },
                props.apr,
                "%")),
        React.createElement(stack_1["default"], { justify: "space-between" },
            React.createElement(text_1["default"], { color: "tip" }, "Liquidity"),
            React.createElement(text_1["default"], { color: "content", weight: "semibold", marginLeft: "4", wordBreak: "break-word" },
                "$",
                props.poolLiquidity.toLocaleString())),
        React.createElement(stack_1["default"], { justify: "space-between" },
            React.createElement(text_1["default"], { color: "tip" }, "7D Fees"),
            React.createElement(text_1["default"], { color: "content", weight: "semibold", marginLeft: "4", wordBreak: "break-word" },
                "$",
                props.fees.toLocaleString())),
        React.createElement(box_1["default"], { width: "full", height: "1", className: styles.divider[state.theme] }),
        React.createElement(stack_1["default"], { justify: "space-between" },
            React.createElement(text_1["default"], { color: "content" }, "Your Liquidity"),
            React.createElement(text_1["default"], { color: "content", weight: "semibold" },
                "$",
                props.yourLiquidity.toLocaleString())),
        React.createElement(stack_1["default"], { justify: "space-between" },
            React.createElement(text_1["default"], { color: "content" }, "Bonded"),
            React.createElement(text_1["default"], { color: "content", weight: "semibold", marginLeft: "4", wordBreak: "break-word" },
                "$",
                props.bonded.toLocaleString()))));
}
exports["default"] = PoolCard;
