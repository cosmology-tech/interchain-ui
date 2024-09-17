import * as React from "react";
import {
  ChainRegistryFetcher,
  ChainRegistryFetcherOptions,
} from "@chain-registry/client";
import uniqBy from "lodash/uniqBy";
import random from "lodash/random";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const amountFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});

const options: ChainRegistryFetcherOptions = {
  urls: [
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/assetlist.json",
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/assetlist.json",
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/assetlist.json",
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/assetlist.json",
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/assetlist.json",
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/secretnetwork/assetlist.json",
  ],
};

export type DefaultNormalizedAsset = {
  available: number;
  priceDisplayAmount: number;
  symbol: string;
  name: string;
  imgSrc: string;
  address?: string;
};

type ComboboxOptionAsset = {
  notionalValue: string;
  amount: string;
  tokenName: string;
  name: string;
  iconUrl: string;
};

type GetAssetListOptions = {
  chainNames?: string[];
  filterFn?: (
    assetList: ChainRegistryFetcher["assetLists"][number],
    chainNames: string[],
  ) => boolean;
  normalizeFn?: (
    asset: ChainRegistryFetcher["assetLists"][number],
  ) => DefaultNormalizedAsset[];
  limit?: number;
};

type GetComboboxOptions = {
  chainNames?: string[];
  filterFn?: (
    assetList: ChainRegistryFetcher["assetLists"][number],
    chainNames: string[],
  ) => boolean;
  normalizeFn?: (
    asset: ChainRegistryFetcher["assetLists"][number],
  ) => ComboboxOptionAsset[];
  limit?: number;
};

const defaultFilterAsset = (
  assetList: ChainRegistryFetcher["assetLists"][number],
  chainNames: string[],
) => {
  return chainNames.includes(assetList.chain_name);
};

const defaultNormalizeAsset = (
  assetList: ChainRegistryFetcher["assetLists"][number],
) => {
  return assetList.assets.map(
    (item, index) =>
      ({
        available: 400,
        priceDisplayAmount: 0.15 * (index + 1),
        symbol: item.symbol,
        name: item.name,
        address: item.address,
        imgSrc:
          item.logo_URIs?.jpeg || item.logo_URIs?.png || item.logo_URIs?.svg,
      }) as DefaultNormalizedAsset,
  );
};

class MockDataClient {
  public registry: ChainRegistryFetcher;
  private _isInitialized: boolean;

  constructor() {
    const registry = new ChainRegistryFetcher(options);
    this._isInitialized = false;
    this.registry = registry;
  }

  async onMount() {
    if (this._isInitialized) {
      return;
    }

    try {
      await this.registry.fetchUrls();
      this._isInitialized = true;
    } catch (err) {
      console.log("MockDataClient: Failed to fetch urls", err);
    }
  }

  getAssetList({
    chainNames = [
      "cosmoshub",
      "stride",
      "osmosis",
      "stargaze",
      "juno",
      "secretnetwork",
    ],
    filterFn = defaultFilterAsset,
    normalizeFn = defaultNormalizeAsset,
    limit = 1000,
  }: GetAssetListOptions = {}) {
    // console.log("DEBUG getAssetList", this.registry.assetLists);

    if (!this._isInitialized) {
      console.log("[MockDataClient] Not initialized yet");
      return [];
    }

    const filteredAssetList = this.registry.assetLists.filter((assetList) =>
      filterFn(assetList, chainNames),
    );

    const flattenedAssets = uniqBy(
      filteredAssetList.reduce((acc, assetList) => {
        return [...acc, ...normalizeFn(assetList)];
      }, [] as DefaultNormalizedAsset[]),
      "symbol",
    ).slice(0, limit);

    return flattenedAssets;
  }

  getComboboxAssetList({
    chainNames = ["cosmoshub", "stride", "stargaze", "juno", "secretnetwork"],
    filterFn = defaultFilterAsset,
    limit = 1000,
  }: GetComboboxOptions = {}) {
    // console.log("DEBUG getAssetList", this.registry.assetLists);

    const filteredAssetList = this.registry.assetLists.filter((assetList) =>
      filterFn(assetList, chainNames),
    );

    const normalizeFn = (
      assetList: ChainRegistryFetcher["assetLists"][number],
    ) => {
      return assetList.assets.map(
        (item) =>
          ({
            notionalValue: moneyFormatter.format(random(1, 10)),
            amount: amountFormatter.format(random(1, 10)),
            tokenName: item.symbol,
            name: item.name,
            iconUrl:
              item.logo_URIs?.jpeg ||
              item.logo_URIs?.png ||
              item.logo_URIs?.svg,
          }) as ComboboxOptionAsset,
      );
    };

    const flattenedAssets = uniqBy(
      filteredAssetList.reduce((acc, assetList) => {
        return [...acc, ...normalizeFn(assetList)];
      }, [] as ComboboxOptionAsset[]),
      "tokenName",
    ).slice(0, limit);

    return flattenedAssets;
  }
}

export const mockDataClient = new MockDataClient();

export const useMockData = ({
  onReady,
}: {
  onReady?: (
    assets: DefaultNormalizedAsset[],
    comboboxAssets: ComboboxOptionAsset[],
  ) => void;
} = {}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [assetList, setAssetList] = React.useState<DefaultNormalizedAsset[]>(
    [],
  );

  const [comboboxAssetList, setComboboxAssetList] = React.useState<
    DefaultNormalizedAsset[]
  >([]);

  React.useEffect(() => {
    mockDataClient.onMount().then(() => {
      const assetListResult = mockDataClient.getAssetList();
      const comboboxAssetsResult = mockDataClient.getComboboxAssetList();

      setAssetList(assetListResult);
      setComboboxAssetList(comboboxAssetsResult);

      setIsReady(true);
      onReady?.(assetListResult, comboboxAssetsResult);
    });
  }, []);

  return {
    isReady: isReady && assetList.length > 0 && comboboxAssetList.length > 0,
    assets: assetList,
    comboboxAssets: comboboxAssetList,
  };
};
