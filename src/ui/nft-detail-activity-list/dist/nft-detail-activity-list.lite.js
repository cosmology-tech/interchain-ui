"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var stack_1 = require("../stack");
var text_1 = require("../text");
var nft_detail_activity_list_item_1 = require("../nft-detail-activity-list-item");
var styles = require("./nft-detail-activity-list.css");
function NftDetailActivityList(props) {
    return (React.createElement(stack_1["default"], { className: styles.container, direction: "column" },
        React.createElement(text_1["default"], { size: "xl", weight: "semibold", attributes: { marginBottom: "10" } }, "Activity"),
        React.createElement(stack_1["default"], { direction: "column", space: "10" },
            React.createElement(mitosis_1.For, { each: props === null || props === void 0 ? void 0 : props.list }, function (item, index) { return (React.createElement(nft_detail_activity_list_item_1["default"], { key: index, event: item === null || item === void 0 ? void 0 : item.event, price: item === null || item === void 0 ? void 0 : item.price, from: item === null || item === void 0 ? void 0 : item.from, to: item === null || item === void 0 ? void 0 : item.to, date: item === null || item === void 0 ? void 0 : item.date })); }))));
}
exports["default"] = NftDetailActivityList;
