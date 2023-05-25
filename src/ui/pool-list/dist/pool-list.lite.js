"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var box_1 = require("../box");
var stack_1 = require("../stack");
var text_1 = require("../text");
var pool_list_item_1 = require("../pool-list-item");
var styles = require("./pool-list.css");
function PoolList(props) {
    // image
    // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
    //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    //         "theme": {
    //           "primary_color_hex": "#5c09a0"
    //         }
    // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
    //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
    var state = mitosis_1.useStore({
        titles: ["Pool", "Liquidity", "24H Volume", "7D Fees", "APR"]
    });
    var item = {
        token1: {
            name: "ATOM",
            imgSrc: "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png"
        },
        token2: {
            name: "OSOM",
            imgSrc: "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
        },
        liquidity: 168767639,
        volume: 3288612,
        fees: 59075,
        apr: 24
    };
    return (React.createElement(box_1["default"], { className: styles.container },
        React.createElement(text_1["default"], { color: "tip", size: "xl", weight: "semibold" }, "Your Pools"),
        React.createElement(stack_1["default"], { className: styles.titleContainer },
            React.createElement(mitosis_1.For, { each: state.titles }, function (item, index) { return (React.createElement(text_1["default"], { key: index, className: styles.title, color: "tip" }, item)); })),
        React.createElement(box_1["default"], { className: styles.listContainer },
            React.createElement(mitosis_1.For, { each: props.list }, function (item, index) { return (React.createElement(pool_list_item_1["default"], { token1: item.token1, token2: item.token2, poolLiquidity: item.poolLiquidity, volume: item.volume, fees: item.fees, apr: item.apr })); }))));
}
exports["default"] = PoolList;
