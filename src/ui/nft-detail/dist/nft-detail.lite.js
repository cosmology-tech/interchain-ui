"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var stack_1 = require("../stack");
var text_1 = require("../text");
var box_1 = require("../box");
var button_1 = require("../button");
var icon_button_1 = require("../icon-button");
var nft_trait_list_1 = require("../nft-trait-list");
var basic_modal_1 = require("../basic-modal");
var list_for_sale_1 = require("../list-for-sale");
var nft_make_offer_1 = require("../nft-make-offer");
var star_text_1 = require("../star-text");
var store_1 = require("../../models/store");
var nft_detail_info_1 = require("../nft-detail-info");
var nft_detail_top_offers_1 = require("../nft-detail-top-offers");
var nft_detail_activity_list_1 = require("../nft-detail-activity-list");
var styles = require("./nft-detail.css");
function NftDetail(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var state = mitosis_1.useStore({
        showListForSaleModal: false,
        showMakeOfferModal: false,
        openListForSale: function () {
            state.showListForSaleModal = true;
        },
        closeListForSale: function () {
            state.showListForSaleModal = false;
        },
        openMakeOffer: function () {
            state.showMakeOfferModal = true;
        },
        closeMakeOffer: function () {
            state.showMakeOfferModal = false;
        }
    });
    return (React.createElement(box_1["default"], { className: styles.nftDetail },
        React.createElement(stack_1["default"], { space: "10" },
            React.createElement(box_1["default"], { flex: 1 },
                React.createElement(box_1["default"], { as: "img", width: "full", height: "auto", borderRadius: "md", attributes: {
                        src: "https://res.cloudinary.com/stargaze/image/upload/w_512/e0445qpobuya6okuk1uw.jpg"
                    } })),
            React.createElement(box_1["default"], { flex: 1 },
                React.createElement(stack_1["default"], { direction: "vertical" },
                    React.createElement(text_1["default"], { color: "textSecondary", weight: "semibold", attributes: { marginBottom: "5" } }, props === null || props === void 0 ? void 0 : props.collectionName),
                    React.createElement(text_1["default"], { size: "4xl", weight: "semibold", attributes: { marginBottom: "7" } }, props === null || props === void 0 ? void 0 : props.tokenName),
                    React.createElement(stack_1["default"], { attributes: { marginBottom: "7", alignItems: "center" } },
                        React.createElement(text_1["default"], { color: "textSecondary", attributes: { marginRight: "3" } }, "Created by"),
                        React.createElement(text_1["default"], { weight: "semibold" }, props === null || props === void 0 ? void 0 : props.creatorName)),
                    React.createElement(text_1["default"], { color: "textSecondary", attributes: { marginBottom: "7" } }, props === null || props === void 0 ? void 0 : props.collectionDesc),
                    React.createElement(star_text_1["default"], { label: "Minted for", value: props === null || props === void 0 ? void 0 : props.mintPrice }),
                    React.createElement(stack_1["default"], { attributes: { alignItems: "center", marginBottom: "12", marginTop: "4" } },
                        React.createElement(text_1["default"], { color: "textSecondary", attributes: { marginRight: "3" } }, "Owned by"),
                        React.createElement(text_1["default"], { weight: "semibold" }, props === null || props === void 0 ? void 0 : props.ownerName)),
                    React.createElement(mitosis_1.Show, { when: props.type === "listForSale" },
                        React.createElement(button_1["default"], { size: "lg", intent: "tertiary", leftIcon: "priceTagLine", attributes: { marginBottom: "8" }, onClick: function () { return state.openListForSale(); } }, "List for Sale"),
                        React.createElement(stack_1["default"], { space: "8" },
                            React.createElement(box_1["default"], { flex: 1 },
                                React.createElement(button_1["default"], { size: "sm", intent: "text", leftIcon: "sendLine", attributes: { width: "full" } }, "Transfer")),
                            React.createElement(box_1["default"], { flex: 1 },
                                React.createElement(button_1["default"], { size: "sm", intent: "text", leftIcon: "fireLine", attributes: { width: "full" } }, "Burn")))),
                    React.createElement(mitosis_1.Show, { when: (props === null || props === void 0 ? void 0 : props.type) === "makeOffer" },
                        React.createElement(button_1["default"], { intent: "tertiary", size: "lg", leftIcon: "coinsLine", onClick: function () { return state.openMakeOffer(); } }, "Make Offer")),
                    React.createElement(mitosis_1.Show, { when: (props === null || props === void 0 ? void 0 : props.type) === "buyNow" },
                        React.createElement(stack_1["default"], { space: "8" },
                            React.createElement(button_1["default"], { intent: "tertiary", size: "lg", leftIcon: "shoppingBagLine" }, "Buy Now"),
                            React.createElement(button_1["default"], { intent: "text", size: "lg", leftIcon: "coinsLine", onClick: function () { return state.openMakeOffer(); } }, "Make Offer")))))),
        React.createElement(stack_1["default"], { attributes: { alignItems: "center", marginTop: "6", marginBottom: "5" } },
            React.createElement(text_1["default"], { color: "textSecondary" }, "Rank"),
            React.createElement(text_1["default"], { weight: "semibold", attributes: { mx: "2" } }, (_b = (_a = store_1.store.getState()) === null || _a === void 0 ? void 0 : _a.formatNumber) === null || _b === void 0 ? void 0 : _b.call(_a, { value: props === null || props === void 0 ? void 0 : props.rarityOrder })),
            React.createElement(text_1["default"], { color: "textSecondary" }, "of " + ((_d = (_c = store_1.store
                .getState()) === null || _c === void 0 ? void 0 : _c.formatNumber) === null || _d === void 0 ? void 0 : _d.call(_c, { value: props === null || props === void 0 ? void 0 : props.tokensCount })))),
        React.createElement(stack_1["default"], { space: "8", attributes: { marginBottom: "11" } },
            React.createElement(button_1["default"], { size: "sm", intent: "text" }, "Download"),
            React.createElement(icon_button_1["default"], { size: "sm", icon: "uploadLine", intent: "text" })),
        React.createElement(nft_trait_list_1["default"], { list: props === null || props === void 0 ? void 0 : props.traits }),
        React.createElement(mitosis_1.Show, { when: (props === null || props === void 0 ? void 0 : props.type) === "makeOffer" },
            React.createElement(box_1["default"], { height: "14" }),
            React.createElement(nft_detail_info_1["default"], { price: (_e = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _e === void 0 ? void 0 : _e.price, owner: (_f = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _f === void 0 ? void 0 : _f.owner, lastSale: (_g = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _g === void 0 ? void 0 : _g.lastSale, topOffer: (_h = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _h === void 0 ? void 0 : _h.topOffer, floorPrice: (_j = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _j === void 0 ? void 0 : _j.floorPrice, isNameVerified: (_k = props === null || props === void 0 ? void 0 : props.detailInfo) === null || _k === void 0 ? void 0 : _k.isNameVerified }),
            React.createElement(box_1["default"], { height: "16" }),
            React.createElement(nft_detail_top_offers_1["default"], { price: (_l = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _l === void 0 ? void 0 : _l.price, floorPrice: (_m = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _m === void 0 ? void 0 : _m.floorPrice, expires: (_o = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _o === void 0 ? void 0 : _o.expires, from: (_p = props === null || props === void 0 ? void 0 : props.detailTopOffer) === null || _p === void 0 ? void 0 : _p.from }),
            React.createElement(box_1["default"], { height: "17" }),
            React.createElement(nft_detail_activity_list_1["default"], { list: (_q = props === null || props === void 0 ? void 0 : props.detailActivity) === null || _q === void 0 ? void 0 : _q.list })),
        React.createElement(basic_modal_1["default"], { modalContentClassName: styles.listForSaleModal, isOpen: state.showListForSaleModal, title: "List for Sale", onClose: function () { return state.closeListForSale(); } },
            React.createElement(list_for_sale_1["default"], null)),
        React.createElement(basic_modal_1["default"], { modalContentClassName: styles.makeOfferModal, isOpen: state.showMakeOfferModal, title: "Make Offer", onClose: function () { return state.closeMakeOffer(); } },
            React.createElement(nft_make_offer_1["default"], { imgSrc: "https://res.cloudinary.com/stargaze/image/upload/erom1wypzaxaratnm7dg.jpg", tokenName: "KUJIRANS #763" }))));
}
exports["default"] = NftDetail;
