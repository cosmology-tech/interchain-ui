"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var store_1 = require("../../models/store");
var stack_1 = require("../stack");
var box_1 = require("../box");
var text_1 = require("../text");
var pool_card_1 = require("../pool-card");
function PoolCardList(props) {
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
    return (React.createElement(box_1["default"], null,
        React.createElement(text_1["default"], { size: "lg", color: "tip", weight: "semibold", marginBottom: "10" }, "Highlighted Pools"),
        React.createElement(stack_1["default"], { space: "10", flexWrap: "wrap" },
            React.createElement(mitosis_1.For, { each: props.list }, function (item, index) { return (React.createElement(pool_card_1["default"], { key: index, token1: item.token1, token2: item.token2, poolLiquidity: item.poolLiquidity, fees: item.fees, apr: item.apr, yourLiquidity: item.yourLiquidity, bonded: item.bonded })); }))));
}
exports["default"] = PoolCardList;
