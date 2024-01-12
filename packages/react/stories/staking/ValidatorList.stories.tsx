import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { asset_list, assets } from "@chain-registry/osmosis";
import { getAssetByDenom } from "@chain-registry/utils";
import { Asset as OsmosisAsset } from "@chain-registry/types";

import Box from "../../src/ui/box";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";
import Stack from "../../src/ui/stack";
import ValidatorList from "../../src/ui/validator-list";
import ValidatorNameCell from "../../src/ui/validator-list/validator-name-cell";
import ValidatorTokenAmountCell from "../../src/ui/validator-list/validator-token-amount-cell";

const meta: Meta = {
  title: "staking/ValidatorList",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const osmosisAssets: OsmosisAsset[] = [...assets.assets, ...asset_list.assets];

const OSMO = getAssetByDenom(osmosisAssets, "uosmo");

type ValidatorRowData = {
  validatorId?: string;
  validatorName: string;
  validatorImg: string;
  stakedAmount: number;
  claimableRewards: number;
  tokenSymbol: string;
};

export const VariantSolid: Story = {
  args: {
    data: [
      {
        validatorName: "Polkachu",
        validatorImg:
          "data:image/svg+xml,%3Csvg class='w-6 h-6' viewBox='0 0 44.426 44.424' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%237c3aed' d='M28.272 25.817c1.006-.551 1.754-1.306 2.24-2.268.486-.96.73-2.065.73-3.314 0-1.247-.244-2.346-.73-3.296-.486-.949-1.236-1.691-2.25-2.223-1.013-.533-2.314-.799-3.905-.799h-5.839V26.64h5.873c1.58 0 2.873-.274 3.881-.823z'%3E%3C/path%3E%3Cpath fill='%237c3aed' d='M22.213 0C9.945 0 0 9.945 0 22.213c0 7.366 3.588 13.892 9.109 17.933.264.103.544.171.844.171a2.364 2.364 0 0 0 2.363-2.363l.004-2.257V8.594h13.014c2.702 0 4.972.504 6.809 1.511 1.838 1.008 3.229 2.39 4.173 4.146.944 1.757 1.417 3.752 1.417 5.983 0 2.256-.476 4.259-1.426 6.011-.95 1.75-2.354 3.127-4.207 4.128-1.853 1.001-4.138 1.502-6.851 1.502h-6.606l-.014 9.086a3.59 3.59 0 0 0 2.559 3.437c.34.016.682.026 1.025.026 12.269 0 22.213-9.944 22.213-22.213C44.426 9.945 34.482 0 22.213 0Z'%3E%3C/path%3E%3C/svg%3E",
        stakedAmount: 200456.22,
        claimableRewards: 5000,
        tokenSymbol: OSMO.symbol,
      },
      {
        validatorName: "Chorus One",
        validatorImg:
          "https://assets-global.website-files.com/63fdf8c863bcf0c02efdffbc/64144c23e693f7d7f5cdb958_chorus_logo.svg",
        stakedAmount: 1000666.56,
        claimableRewards: 8024,
        tokenSymbol: OSMO.symbol,
      },
      {
        validatorName: "Forbole",
        validatorImg:
          "data:image/svg+xml,%3Csvg width='84' height='109' viewBox='0 0 84 109' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M36.8619 100.844C38.3604 102.411 39.8572 103.976 41.3912 105.474C42.2674 106.328 42.53 106.631 42.9431 107.108C43.176 107.377 43.4566 107.701 43.9219 108.21C50.0618 102.184 64.1194 88.2986 68.7109 82.7696C76.3284 73.5924 82.8618 63.9691 83.2581 51.3995C83.4925 43.9351 81.6286 36.5553 77.8797 30.1044C77.8128 30.8819 77.7632 31.5565 77.7185 32.1638C77.6365 33.2786 77.5712 34.1661 77.4466 35.0453C76.2631 42.1938 73.1796 48.8892 68.5212 54.4254C58.8751 67.0961 52.5594 73.5207 39.8837 86.4151C37.3044 89.0388 34.4617 91.9305 31.2741 95.1972C33.1867 97.0011 35.0256 98.9239 36.8619 100.844ZM17.2519 80.2107C17.9464 80.9641 18.8958 81.9939 19.3991 82.4968L19.3906 82.494C20.65 83.7526 21.7743 84.9158 22.8721 86.0516C24.6168 87.8568 26.2946 89.5927 28.3414 91.532C36.405 82.8956 41.9172 77.0954 46.0261 72.7716C53.6359 64.7641 56.4329 61.8209 61.7104 55.3062C66.113 50.0284 70.0548 44.38 73.492 38.4236C75.2104 35.7501 76.0704 32.6119 75.956 29.4324C75.8416 26.253 74.7583 23.1852 72.8523 20.6431C64.2921 9.4799 50.7837 2.28873 40.1429 4.72935C39.5938 4.92366 39.0925 5.2336 38.6726 5.63838C38.2528 6.04316 37.924 6.5334 37.7084 7.07621C34.0143 2.87686 30.9939 -0.0183563 24.8172 0.856745L26.7364 4.42818L16.4862 3.44227C17.1492 4.37473 17.745 5.22213 18.2987 6.00958C19.4473 7.64312 20.4146 9.01872 21.4231 10.3607C21.8608 10.9007 22.3511 11.3957 22.8866 11.8381C22.1305 12.7602 21.3728 13.6811 20.6151 14.6019C17.9828 17.8011 15.3513 20.9992 12.7949 24.2401C12.0646 25.1635 11.0965 26.6438 11.3796 27.4365C13.1264 32.1535 11.2182 35.9504 9.26375 39.8392C9.02969 40.305 8.79497 40.772 8.56579 41.2421C6.61656 45.2442 4.82732 49.3229 3.0366 53.4051C2.31777 55.0437 1.59871 56.6829 0.868962 58.3179C0.559764 58.7925 0.374146 59.3374 0.329108 59.9027C0.284069 60.468 0.381048 61.0356 0.611165 61.5535C0.841281 62.0714 1.19718 62.5231 1.64627 62.8672C2.09535 63.2113 2.62328 63.4368 3.18169 63.5231C6.4642 64.6519 9.81506 65.5696 13.2139 66.2705C17.5846 67.0547 20.1323 64.3982 20.2738 59.9147C20.331 57.9369 20.7956 55.9925 21.6382 54.2038C22.7822 51.7637 24.7444 49.8049 27.1817 48.6701C29.619 47.5352 32.3762 47.2965 34.9711 47.9957C36.8429 48.359 38.7786 48.1891 40.5591 47.5052C42.3396 46.8213 43.8938 45.6507 45.0457 44.1259C45.5608 43.5156 46.0881 42.9157 46.6152 42.3161C47.5627 41.2383 48.5094 40.1615 49.3825 39.0259C54.5146 32.3774 59.6072 25.7034 59.5137 16.4296C59.9928 17.85 60.3712 19.3026 60.646 20.7767C61.5094 27.911 58.0021 33.6361 53.9088 38.7503C42.5349 53.281 30.1031 66.945 16.7155 79.63C16.859 79.7845 17.044 79.9852 17.2519 80.2107Z' fill='%23BD081C'/%3E%3C/svg%3E%0A",
        stakedAmount: 3400233,
        claimableRewards: 7500,
        tokenSymbol: OSMO.symbol,
      },
    ] satisfies ValidatorRowData[],
  },
  render: (props) => {
    return (
      <ValidatorList
        columns={[
          {
            id: "validator",
            label: "Validator",
            width: "196px",
            align: "left",
            render: (rowData: ValidatorRowData) => (
              <ValidatorNameCell
                validatorName={rowData.validatorName}
                validatorImg={rowData.validatorImg}
              />
            ),
          },
          {
            id: "stakedAmount",
            label: "Amount Staked",
            width: "196px",
            align: "right",
            render: (rowData: ValidatorRowData) => (
              <ValidatorTokenAmountCell
                amount={rowData.stakedAmount}
                symbol={rowData.tokenSymbol}
                formatOptions={{
                  maximumFractionDigits: 4,
                }}
              />
            ),
          },
          {
            id: "claimableRewards",
            label: "Claimable Rewards",
            width: "196px",
            align: "right",
            render: (rowData: ValidatorRowData) => (
              <ValidatorTokenAmountCell
                amount={rowData.claimableRewards}
                symbol={rowData.tokenSymbol}
                formatOptions={{
                  maximumFractionDigits: 4,
                }}
              />
            ),
          },
          {
            id: "action",
            width: "196px",
            align: "right",
            render: () => (
              <Box
                width="100%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button variant="solid" intent="tertiary" size="sm">
                  Manage
                </Button>
              </Box>
            ),
          },
        ]}
        data={props.data}
        tableProps={{
          minWidth: "800px",
        }}
      />
    );
  },
};

type ValidatorRowData2 = {
  validatorId?: string;
  validatorName: string;
  validatorImg: string;
  tokenSymbol: string;
  votingPower: number;
  commission: number;
  apr: string;
};

export const VariantGhost: Story = {
  args: {
    data: [
      {
        validatorId: "1",
        validatorName: "Polkachu",
        validatorImg:
          "data:image/svg+xml,%3Csvg class='w-6 h-6' viewBox='0 0 44.426 44.424' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%237c3aed' d='M28.272 25.817c1.006-.551 1.754-1.306 2.24-2.268.486-.96.73-2.065.73-3.314 0-1.247-.244-2.346-.73-3.296-.486-.949-1.236-1.691-2.25-2.223-1.013-.533-2.314-.799-3.905-.799h-5.839V26.64h5.873c1.58 0 2.873-.274 3.881-.823z'%3E%3C/path%3E%3Cpath fill='%237c3aed' d='M22.213 0C9.945 0 0 9.945 0 22.213c0 7.366 3.588 13.892 9.109 17.933.264.103.544.171.844.171a2.364 2.364 0 0 0 2.363-2.363l.004-2.257V8.594h13.014c2.702 0 4.972.504 6.809 1.511 1.838 1.008 3.229 2.39 4.173 4.146.944 1.757 1.417 3.752 1.417 5.983 0 2.256-.476 4.259-1.426 6.011-.95 1.75-2.354 3.127-4.207 4.128-1.853 1.001-4.138 1.502-6.851 1.502h-6.606l-.014 9.086a3.59 3.59 0 0 0 2.559 3.437c.34.016.682.026 1.025.026 12.269 0 22.213-9.944 22.213-22.213C44.426 9.945 34.482 0 22.213 0Z'%3E%3C/path%3E%3C/svg%3E",
        tokenSymbol: OSMO.symbol,
        votingPower: 1_145_810.4876,
        commission: 0.05,
        apr: "10.00%",
      },
      {
        validatorId: "2",
        validatorName: "Chorus One",
        validatorImg:
          "https://assets-global.website-files.com/63fdf8c863bcf0c02efdffbc/64144c23e693f7d7f5cdb958_chorus_logo.svg",
        tokenSymbol: OSMO.symbol,
        votingPower: 1_145_810.4876,
        commission: 0.05,
        apr: "22.00%",
      },
      {
        validatorId: "3",
        validatorName: "Forbole",
        validatorImg:
          "data:image/svg+xml,%3Csvg width='84' height='109' viewBox='0 0 84 109' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M36.8619 100.844C38.3604 102.411 39.8572 103.976 41.3912 105.474C42.2674 106.328 42.53 106.631 42.9431 107.108C43.176 107.377 43.4566 107.701 43.9219 108.21C50.0618 102.184 64.1194 88.2986 68.7109 82.7696C76.3284 73.5924 82.8618 63.9691 83.2581 51.3995C83.4925 43.9351 81.6286 36.5553 77.8797 30.1044C77.8128 30.8819 77.7632 31.5565 77.7185 32.1638C77.6365 33.2786 77.5712 34.1661 77.4466 35.0453C76.2631 42.1938 73.1796 48.8892 68.5212 54.4254C58.8751 67.0961 52.5594 73.5207 39.8837 86.4151C37.3044 89.0388 34.4617 91.9305 31.2741 95.1972C33.1867 97.0011 35.0256 98.9239 36.8619 100.844ZM17.2519 80.2107C17.9464 80.9641 18.8958 81.9939 19.3991 82.4968L19.3906 82.494C20.65 83.7526 21.7743 84.9158 22.8721 86.0516C24.6168 87.8568 26.2946 89.5927 28.3414 91.532C36.405 82.8956 41.9172 77.0954 46.0261 72.7716C53.6359 64.7641 56.4329 61.8209 61.7104 55.3062C66.113 50.0284 70.0548 44.38 73.492 38.4236C75.2104 35.7501 76.0704 32.6119 75.956 29.4324C75.8416 26.253 74.7583 23.1852 72.8523 20.6431C64.2921 9.4799 50.7837 2.28873 40.1429 4.72935C39.5938 4.92366 39.0925 5.2336 38.6726 5.63838C38.2528 6.04316 37.924 6.5334 37.7084 7.07621C34.0143 2.87686 30.9939 -0.0183563 24.8172 0.856745L26.7364 4.42818L16.4862 3.44227C17.1492 4.37473 17.745 5.22213 18.2987 6.00958C19.4473 7.64312 20.4146 9.01872 21.4231 10.3607C21.8608 10.9007 22.3511 11.3957 22.8866 11.8381C22.1305 12.7602 21.3728 13.6811 20.6151 14.6019C17.9828 17.8011 15.3513 20.9992 12.7949 24.2401C12.0646 25.1635 11.0965 26.6438 11.3796 27.4365C13.1264 32.1535 11.2182 35.9504 9.26375 39.8392C9.02969 40.305 8.79497 40.772 8.56579 41.2421C6.61656 45.2442 4.82732 49.3229 3.0366 53.4051C2.31777 55.0437 1.59871 56.6829 0.868962 58.3179C0.559764 58.7925 0.374146 59.3374 0.329108 59.9027C0.284069 60.468 0.381048 61.0356 0.611165 61.5535C0.841281 62.0714 1.19718 62.5231 1.64627 62.8672C2.09535 63.2113 2.62328 63.4368 3.18169 63.5231C6.4642 64.6519 9.81506 65.5696 13.2139 66.2705C17.5846 67.0547 20.1323 64.3982 20.2738 59.9147C20.331 57.9369 20.7956 55.9925 21.6382 54.2038C22.7822 51.7637 24.7444 49.8049 27.1817 48.6701C29.619 47.5352 32.3762 47.2965 34.9711 47.9957C36.8429 48.359 38.7786 48.1891 40.5591 47.5052C42.3396 46.8213 43.8938 45.6507 45.0457 44.1259C45.5608 43.5156 46.0881 42.9157 46.6152 42.3161C47.5627 41.2383 48.5094 40.1615 49.3825 39.0259C54.5146 32.3774 59.6072 25.7034 59.5137 16.4296C59.9928 17.85 60.3712 19.3026 60.646 20.7767C61.5094 27.911 58.0021 33.6361 53.9088 38.7503C42.5349 53.281 30.1031 66.945 16.7155 79.63C16.859 79.7845 17.044 79.9852 17.2519 80.2107Z' fill='%23BD081C'/%3E%3C/svg%3E%0A",
        tokenSymbol: OSMO.symbol,
        votingPower: 1_145_810.4876,
        commission: 0.05,
        apr: "35.00%",
      },
    ] satisfies ValidatorRowData2[],
  },
  render: (props) => {
    return (
      <ValidatorList
        variant="ghost"
        columns={[
          {
            id: "validator",
            label: "Validator",
            width: "196px",
            align: "left",
            render: (rowData: ValidatorRowData2) => (
              <ValidatorNameCell
                size="sm"
                validatorId={rowData.validatorId}
                validatorName={rowData.validatorName}
                validatorImg={rowData.validatorImg}
              />
            ),
          },
          {
            id: "votingPower",
            label: "Voting Power",
            width: "196px",
            align: "right",
            render: (rowData: ValidatorRowData2) => (
              <ValidatorTokenAmountCell
                amount={rowData.votingPower}
                formatOptions={{
                  maximumFractionDigits: 4,
                }}
              />
            ),
          },
          {
            id: "commission",
            label: "Commission",
            width: "196px",
            align: "right",
            render: (rowData: ValidatorRowData2) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                gap="$2"
              >
                <Text
                  fontWeight="$normal"
                  fontSize="$xs"
                  color="$textSecondary"
                >
                  {rowData.tokenSymbol}
                </Text>

                <Text fontWeight="$semibold" fontSize="$xs">
                  {rowData.commission}%
                </Text>
              </Box>
            ),
          },
          {
            id: "apr",
            label: "APR",
            width: "196px",
            align: "right",
          },
          {
            id: "action",
            width: "196px",
            align: "right",
            render: () => (
              <Box
                width="100%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button variant="solid" intent="secondary" size="sm">
                  Manage
                </Button>
              </Box>
            ),
          },
        ]}
        data={props.data}
        tableProps={{
          minWidth: "800px",
        }}
      />
    );
  },
};
