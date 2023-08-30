import React from "react";
import { assets, chains, ibc } from "chain-registry";

export default function useAssetList({
  chainName = "osmosis",
}: {
  chainName?: string;
}) {
  const assetList =
    assets.find(({ chain_name }) => chain_name === chainName)?.assets ?? [];

  return { assetList };
}
