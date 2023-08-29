import { assets } from "chain-registry";

export const getTransferList = (chainName = "osmosis") => {
  const assetList =
    assets.find(({ chain_name }) => chain_name === chainName)?.assets ?? [];
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
