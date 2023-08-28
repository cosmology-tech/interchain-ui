import { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";
export interface NftProfileProps {
  name: string;
  isNameVerified: boolean;
  collections: number | undefined;
  nfts: number | undefined;
  listedForSale: number | undefined;
  list: NftProfileCardProps[];
  onView: () => void
}
