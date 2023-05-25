"use strict";
exports.__esModule = true;
var mitosis_1 = require("@builder.io/mitosis");
var clsx_1 = require("clsx");
var sprinkles_css_1 = require("../../styles/sprinkles.css");
var box_1 = require("../box");
var stack_1 = require("../stack");
var text_1 = require("../text");
var icon_1 = require("../icon");
var pool_name_1 = require("../pool/components/pool-name");
var store_1 = require("../../models/store");
var styles = require("./pool-list-item.css");
function PoolListItem(props) {
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
    function APR(aprProps) {
        return (React.createElement(stack_1["default"], { className: aprProps.className, justify: "space-between", align: "center" },
            React.createElement(text_1["default"], { color: "content", weight: "semibold", marginRight: "4" },
                props.apr,
                "%"),
            React.createElement(stack_1["default"], { className: styles.iconConntainer[state.theme], justify: "center", align: "center" },
                React.createElement(icon_1["default"], { name: "verticalMore", color: "content" }))));
    }
    function CellWithTitle(props) {
        return (React.createElement(stack_1["default"], { className: clsx_1["default"](styles.responsiveText, props.className), direction: "column", justify: "center" },
            React.createElement(text_1["default"], { color: "tip", className: clsx_1["default"](styles.onlySm, sprinkles_css_1.sprinkles({ marginBottom: "2" })), wordBreak: "break-word", marginRight: "4" }, props.title),
            props.children));
    }
    return (React.createElement(stack_1["default"], { align: "center", className: styles.container },
        React.createElement(pool_name_1["default"], { className: styles.nameContainer, token1: props.token1, token2: props.token2 }),
        React.createElement(CellWithTitle, { className: styles.onlySm, title: "APR" },
            React.createElement(APR, { className: styles.onlySm })),
        React.createElement(box_1["default"], { className: styles.onlySm, width: "full", height: "9" }),
        React.createElement(CellWithTitle, { title: "Liquidity" },
            React.createElement(text_1["default"]
            // className={styles.responsiveText}
            , { 
                // className={styles.responsiveText}
                color: "content", weight: "semibold", wordBreak: "break-word", marginRight: "4" },
                "$",
                props.poolLiquidity.toLocaleString())),
        React.createElement(CellWithTitle, { title: "24H Volume" },
            React.createElement(text_1["default"]
            // className={styles.responsiveText}
            , { 
                // className={styles.responsiveText}
                color: "content", weight: "semibold", wordBreak: "break-word", marginRight: "4" },
                "$",
                props.volume.toLocaleString())),
        React.createElement(CellWithTitle, { title: "7D Fees" },
            React.createElement(text_1["default"]
            // className={styles.responsiveText}
            , { 
                // className={styles.responsiveText}
                color: "content", weight: "semibold", wordBreak: "break-word", marginRight: "4" },
                "$",
                props.fees.toLocaleString())),
        React.createElement(APR, { className: clsx_1["default"](styles.responsiveText, styles.lgAPR) }),
        React.createElement(box_1["default"], { className: styles.onlySm, width: "full", height: "4" })));
}
exports["default"] = PoolListItem;
