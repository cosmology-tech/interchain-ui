"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var stack_1 = require("../stack");
var text_1 = require("../text");
var box_1 = require("../box");
var button_1 = require("../button");
var icon_button_1 = require("../icon-button");
var nft_trait_list_1 = require("../nft-trait-list");
var star_text_1 = require("../star-text");
var store_1 = require("../../models/store");
var nft_detail_info_1 = require("../nft-detail-info");
var nft_detail_top_offers_1 = require("../nft-detail-top-offers");
var nft_detail_activity_list_1 = require("../nft-detail-activity-list");
var styles = require("./nft-detail.css");
function NftDetail(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var state = mitosis_1.useStore({});
    return (React.createElement(box_1["default"], { className: styles.nftDetail },
        React.createElement(stack_1["default"], { space: "$10" },
            React.createElement(box_1["default"], { flex: 1 },
                React.createElement(box_1["default"], { as: "img", width: "$full", height: "$auto", borderRadius: "$md", attributes: {
                        src: props.imgSrc
                    } })),
            React.createElement(box_1["default"], { flex: 1 },
                React.createElement(text_1["default"], { color: "$textSecondary", fontWeight: "$semibold", attributes: { marginBottom: "$5" } }, props === null || props === void 0 ? void 0 : props.collectionName),
                React.createElement(text_1["default"], { fontSize: "$4xl", fontWeight: "$semibold", attributes: { marginBottom: "$7" } }, props === null || props === void 0 ? void 0 : props.tokenName),
                React.createElement(stack_1["default"], { attributes: { marginBottom: "$7", alignItems: "center" } },
                    React.createElement(text_1["default"], { color: "$textSecondary", attributes: { marginRight: "$3" } }, "Created by"),
                    React.createElement(text_1["default"], { fontWeight: "$semibold" }, props === null || props === void 0 ? void 0 : props.creatorName)),
                React.createElement(text_1["default"], { color: "$textSecondary", attributes: { marginBottom: "7" } }, props === null || props === void 0 ? void 0 : props.collectionDesc),
                React.createElement(star_text_1["default"], { label: "Minted for", value: props === null || props === void 0 ? void 0 : props.mintPrice }),
                React.createElement(stack_1["default"], { attributes: {
                        alignItems: "center",
                        marginBottom: "$12",
                        marginTop: "$4"
                    } },
                    React.createElement(text_1["default"], { color: "$textSecondary", attributes: { marginRight: "$3" } }, "Owned by"),
                    React.createElement(text_1["default"], { fontWeight: "$semibold" }, props === null || props === void 0 ? void 0 : props.ownerName)),
                React.createElement(mitosis_1.Show, { when: props.type === "listForSale" },
                    React.createElement(button_1["default"], { size: "lg", intent: "tertiary", leftIcon: "priceTagLine", attributes: { width: "$full" }, onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onListForSale) === null || _a === void 0 ? void 0 : _a.call(props); } }, "List for Sale"),
                    React.createElement(stack_1["default"], { space: "$8", attributes: { marginTop: "$8" } },
                        React.createElement(box_1["default"], { flex: 1 },
                            React.createElement(button_1["default"], { size: "sm", intent: "text", leftIcon: "sendLine", attributes: { width: "$full" }, onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onTransfer) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Transfer")),
                        React.createElement(box_1["default"], { flex: 1 },
                            React.createElement(button_1["default"], { size: "sm", intent: "text", leftIcon: "fireLine", attributes: { width: "$full" }, onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onBurn) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Burn")))),
                React.createElement(mitosis_1.Show, { when: (props === null || props === void 0 ? void 0 : props.type) === "makeOffer" },
                    React.createElement(button_1["default"], { intent: "tertiary", size: "lg", leftIcon: "coinsLine", attributes: { width: "$full" }, onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onMakeOffer) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Make Offer")),
                React.createElement(mitosis_1.Show, { when: (props === null || props === void 0 ? void 0 : props.type) === "buyNow" },
                    React.createElement(stack_1["default"], { space: "$8" },
                        React.createElement(button_1["default"], { intent: "tertiary", size: "lg", leftIcon: "shoppingBagLine", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onBuyNow) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Buy Now"),
                        React.createElement(button_1["default"], { intent: "text", size: "lg", leftIcon: "coinsLine", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onMakeOffer) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Make Offer"))))),
        React.createElement(stack_1["default"], { attributes: {
                alignItems: "center",
                marginTop: "$6",
                marginBottom: "$5"
            } },
            React.createElement(text_1["default"], { color: "$textSecondary" }, "Rank"),
            React.createElement(text_1["default"], { fontWeight: "$semibold", attributes: { mx: "$2" } }, (_b = (_a = store_1.store.getState()) === null || _a === void 0 ? void 0 : _a.formatNumber) === null || _b === void 0 ? void 0 : _b.call(_a, { value: props === null || props === void 0 ? void 0 : props.rarityOrder })),
            React.createElement(text_1["default"], { color: "$textSecondary" }, "of " + ((_d = (_c = store_1.store
                .getState()) === null || _c === void 0 ? void 0 : _c.formatNumber) === null || _d === void 0 ? void 0 : _d.call(_c, { value: props === null || props === void 0 ? void 0 : props.tokensCount })))),
        React.createElement(stack_1["default"], { space: "$8", attributes: { marginBottom: "$11" } },
            React.createElement(button_1["default"], { size: "sm", intent: "text", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onDownload) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Download"),
            React.createElement(icon_button_1["default"], { size: "sm", icon: "uploadLine", intent: "text", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onShare) === null || _a === void 0 ? void 0 : _a.call(props); } })),
        React.createElement(mitosis_1.Show, { when: !!(props === null || props === void 0 ? void 0 : props.traits) },
            React.createElement(nft_trait_list_1["default"], { list: props === null || props === void 0 ? void 0 : props.traits })),
        React.createElement(mitosis_1.Show, { when: !!props.detailInfo },
            React.createElement(box_1["default"], { height: "$14" }),
            React.createElement(nft_detail_info_1["default"], { price: (_e = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _e === void 0 ? void 0 : _e.price, owner: (_f = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _f === void 0 ? void 0 : _f.owner, lastSale: (_g = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _g === void 0 ? void 0 : _g.lastSale, topOffer: (_h = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _h === void 0 ? void 0 : _h.topOffer, floorPrice: (_j = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _j === void 0 ? void 0 : _j.floorPrice, isNameVerified: (_k = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _k === void 0 ? void 0 : _k.isNameVerified })),
        React.createElement(mitosis_1.Show, { when: !!props.detailTopOffer },
            React.createElement(box_1["default"], { height: "$16" }),
            React.createElement(nft_detail_top_offers_1["default"], { price: (_l = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _l === void 0 ? void 0 : _l.price, floorPrice: (_m = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _m === void 0 ? void 0 : _m.floorPrice, expires: (_o = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _o === void 0 ? void 0 : _o.expires, from: (_p = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _p === void 0 ? void 0 : _p.from })),
        React.createElement(mitosis_1.Show, { when: !!props.detailActivity },
            React.createElement(box_1["default"], { height: "$17" }),
            React.createElement(nft_detail_activity_list_1["default"], { list: (_q = props === null || props === void 0 ? void 0 : props.detailActivity) === null || _q === void 0 ? void 0 : _q.list }))));
}
exports["default"] = NftDetail;
