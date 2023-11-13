import { assets } from "chain-registry";

export const getTransferList = (
  filterFn?: (assetList: typeof assets) => boolean
) => {
  let filteredAssets = assets;

  let assetList: any = [];

  if (!filterFn) {
    filteredAssets = assets.filter((item) =>
      ["cosmoshub", "stride", "stargaze"].includes(item.chain_name)
    );
  }

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
      available: 1.33 * (index + 1),
      priceDisplayAmount: 0.33 * (index + 1),
      symbol: item.symbol,
      name: item.name,
      imgSrc:
        item.logo_URIs?.jpeg || item.logo_URIs?.png || item.logo_URIs?.svg,
    };
  });
};
