import { assets } from "chain-registry";
import { random } from "lodash";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const amountFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});

export const getChainSwapComboboxOptions = () => {
  const filteredAssets = assets.filter((item) =>
    ["cosmoshub", "stride", "stargaze"].includes(item.chain_name)
  );

  let assetList: any = [];

  for (let i = 0; i <= filteredAssets.length; i++) {
    const itemList = filteredAssets[i]?.assets ?? [];
    assetList = [...assetList, ...itemList];
  }

  // Get the unique symbol
  assetList = Array.from(new Set(assetList.map((item) => item.symbol))).map(
    (symbol) => {
      return assetList.find((item) => item.symbol === symbol);
    }
  );

  assetList = assetList.slice(0, 60);

  return assetList.map((item, index) => {
    return {
      notionalValue: moneyFormatter.format(random(1, 10)),
      amount: amountFormatter.format(random(1, 10)),
      tokenName: item.symbol,
      name: item.name,
      iconUrl:
        item.logo_URIs?.jpeg || item.logo_URIs?.png || item.logo_URIs?.svg,
    };
  });
};
