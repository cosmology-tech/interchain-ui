import React, { useEffect, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolList } from "../../src";

const meta: Meta<typeof PoolList> = {
  component: PoolList,
  title: "Pool/PoolList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    list: [
      {
        id: "1",
        poolAssets: [
          {
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
            symbol: "ATOM",
            denom: "Cosmos Hub",
            priceDisplayAmount: 8.35,
            available: "15.868",
          },
          {
            available: "57.61",
            symbol: "OSMO",
            denom: "Osmosis",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
            priceDisplayAmount: 0.4671,
          },
        ],
        totalBalanceCoins: [
          {
            symbol: "ATOM",
            amount: "20525.06381023874581",
            displayAmount: "0.02052506381023874581",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          },
          {
            symbol: "OSMO",
            displayAmount: "0.3824102514677405108",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
          },
        ],
        apr: {
          "1": {
            totalApr: "3.10473009837113909",
            bondedValue: 0,
            bondedShares: 1.57,
            swapFeeApr: {
              swapFeeValuePerDay: "2501.972",
              apr: "3.10473009837113909",
            },
          },
          "7": {
            bondedValue: 2.68,
            bondedShares: 3.89,
            totalApr: "8.46",
            swapFeeApr: {
              swapFeeValuePerDay: "2501.972",
              apr: "3.10473009837113909",
            },
          },
          "14": {
            bondedValue: 5.33,
            bondedShares: 9.76,
            totalApr: "7.46",
            swapFeeApr: {
              swapFeeValuePerDay: "2501.972",
              apr: "3.10473009837113909",
            },
          },
        },
        liquidity: "29422809",
        myLiquidity: "0.33",
        bonded: "0.016",
        volume24H: 3288612,
        fees7D: 59075,
        swapFee: 0.2,
        totalBalance: "1228.02",
        totalShares: "212.0432",
        lpTokenBalance: "22.51",
        lpTokenShares: "12.02",
        unbondedBalance: "0.338654",
        unbondedShares: "2.2098786",

        myLiquidityCoins: [
          {
            symbol: "ATOM",
            displayAmount: "0.01949381023874581",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          },
          {
            symbol: "OSMO",
            displayAmount: "0.365385514677405108",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
          },
        ],
      },
      {
        id: "2",
        poolAssets: [
          {
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
            symbol: "ATOM",
            denom: "Cosmos Hub",
            priceDisplayAmount: 8.35,
            available: "15.868",
          },
          {
            available: "57.61",
            symbol: "OSMO",
            denom: "Osmosis",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
            priceDisplayAmount: 0.4671,
          },
        ],
        totalBalanceCoins: [
          {
            symbol: "ATOM",
            amount: "20525.06381023874581",
            displayAmount: "0.02052506381023874581",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          },
          {
            symbol: "OSMO",
            displayAmount: "0.3824102514677405108",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
          },
        ],
        apr: {
          "1": {
            totalApr: "3.10473009837113909",
            bondedValue: 0,
            bondedShares: 1.57,
            swapFeeApr: {
              swapFeeValuePerDay: "2501.972",
              apr: "3.10473009837113909",
            },
          },
          "7": {
            bondedValue: 2.68,
            bondedShares: 3.89,
            totalApr: "8.46",
            swapFeeApr: {
              swapFeeValuePerDay: "2501.972",
              apr: "3.10473009837113909",
            },
          },
          "14": {
            bondedValue: 5.33,
            bondedShares: 9.76,
            totalApr: "7.46",
            swapFeeApr: {
              swapFeeValuePerDay: "2501.972",
              apr: "3.10473009837113909",
            },
          },
        },
        liquidity: "29422809",
        myLiquidity: "0.33",
        bonded: "0.016",
        volume24H: 3288612,
        fees7D: 59075,
        swapFee: 0.2,
        totalBalance: "1228.02",
        totalShares: "212.0432",
        lpTokenBalance: "22.51",
        lpTokenShares: "12.02",
        unbondedBalance: "0.338654",
        unbondedShares: "2.2098786",

        myLiquidityCoins: [
          {
            symbol: "ATOM",
            displayAmount: "0.01949381023874581",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          },
          {
            symbol: "OSMO",
            displayAmount: "0.365385514677405108",
            imgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
          },
        ],
      },
    ],
  },
  render: (props) => {
    const [list, setList] = useState([])
    useEffect(() => {
      let newList = props.list.map((item) => {
        return {
          ...item,
          onAddLiquidity: (assets) => {
            console.log("onAddLiquidity======", assets);
            return new Promise(function (resolve) {
              setTimeout(() => {
                resolve({
                  type: "success",
                  title: "add liquidity succsss",
                })
              }, 2000);
            });
          },
          onRemoveLiquidity(percent) {
            console.log("onRemoveLiquidity====", percent);
            return new Promise(function (resolve) {
              setTimeout(() => {
                resolve({
                  type: "success",
                  title: "Remove liquidity success",
                })
              }, 2000);
            });
          },
          onBond(detail) {
            console.log("onBond======", detail);
            return new Promise(function (resolve) {
              setTimeout(() => {
                resolve({
                  type: "success",
                  title: "bond success",
                });
              }, 2000);
            });
          },
          onUnbond(detail) {
            console.log("onUnbond======", detail);
            return new Promise(function (resolve) {
              setTimeout(() => {
                resolve({
                  type: "success",
                  title: "bond success",
                });
              }, 2000);
            });
          },
          onStartEarning() {
            console.log("onStartEarning======");
            let res = new Promise(function (resolve) {
              setTimeout(() => {
                resolve({
                  type: "success",
                  title: "start earning success",
                });
              }, 2000);
            });
            return res;
          },
        };
      });
      setList(newList)
    }, []);
    return <PoolList list={list} />
  },
};
