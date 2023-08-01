import { useStore } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Tabs from "../tabs";
import Box from '../box'
import NftFixedPrice from "../nft-fixed-price";
import NftAuction from "../nft-auction";
import NftSellNow from "../nft-sell-now";
import * as styles from "./list-for-sale.css";
import { TabsProps, TabProps } from "../tabs/tabs.types";

export default function ListForSale(props) {
  const state = useStore<{
    tabs: TabProps[];
  }>({
    tabs: [
      {
        label: "Fixed Price",
        Component: () => <NftFixedPrice floorPrice={300} highestOffer={189} />,
      },
      {
        label: "Auction",
        Component: () => <NftAuction floorPrice={300} highestOffer={189} />,
      },
      {
        label: "Sell Now",
        Component: () => (
          <NftSellNow
            bestOffer={120}
            offerToFloorPriceRatio="0.05"
            floorPrice={99}
          />
        ),
      },
    ],
  });
  return (
    <Box className={styles.container}>
      <Box>
      <Tabs tabs={state.tabs} />
      </Box>
    </Box>
  );
}
