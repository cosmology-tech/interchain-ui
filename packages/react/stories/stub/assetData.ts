import { assets } from "chain-registry";

export const getTransferList = (chainName = "osmosis") => {
  // let assetList =
  //   assets.find(({ chain_name }) => chain_name === chainName)?.assets ?? [];

  let assetList: any = [];
  for (let i = 0; i <= assets.length; i++) {
    let itemList = assets[i]?.assets ?? [];
    assetList = [...assetList, ...itemList];
  }

  // Get the unique symbol
  assetList = Array.from(new Set(assetList.map(item => item.symbol))).map(symbol => {
    return assetList.find(item => item.symbol === symbol);
  });

  assetList = assetList.slice(0, 60)

  return assetList.map((item, index) => {
    return {
      available: 1.33 * (index + 1),
      priceDisplayAmount: 0.33 * (index + 1),
      symbol: item.symbol,
      denom: item.name,
      imgSrc:
        item.logo_URIs?.jpeg || item.logo_URIs?.png || item.logo_URIs?.svg,
    };
  });
};
