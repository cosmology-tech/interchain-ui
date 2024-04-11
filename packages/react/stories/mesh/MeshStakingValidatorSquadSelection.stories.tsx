import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Icon from "../../src/ui/icon";
import Stack from "../../src/ui/stack";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";
import Divider from "../../src/ui/divider";
import { useMockData, DefaultNormalizedAsset } from "../stub/mock-data-client";
// @ts-ignore
import akashImage from "../../static/validators/akash.png";
// @ts-ignore
import cosmologyImage from "../../static/validators/cosmology.svg";

// ==== Mesh components
import MeshButton from "../../src/ui/mesh-staking/mesh-button";
import MeshTab from "../../src/ui/mesh-staking/mesh-tab";
import MeshModal from "../../src/ui/mesh-modal";
import MeshTable from "../../src/ui/mesh-staking/mesh-table";
import MeshTableChainCell from "../../src/ui/mesh-staking/mesh-table-chain-cell";
import MeshProvider from "../../src/ui/mesh-staking/mesh-provider";

const meta: Meta<typeof MeshModal> = {
  component: MeshModal,
  title: "mesh/MeshStakingValidatorSquadSelection",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const validatorThumbnails = [
  "data:image/svg+xml,%3Csvg class='w-6 h-6' viewBox='0 0 44.426 44.424' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%237c3aed' d='M28.272 25.817c1.006-.551 1.754-1.306 2.24-2.268.486-.96.73-2.065.73-3.314 0-1.247-.244-2.346-.73-3.296-.486-.949-1.236-1.691-2.25-2.223-1.013-.533-2.314-.799-3.905-.799h-5.839V26.64h5.873c1.58 0 2.873-.274 3.881-.823z'%3E%3C/path%3E%3Cpath fill='%237c3aed' d='M22.213 0C9.945 0 0 9.945 0 22.213c0 7.366 3.588 13.892 9.109 17.933.264.103.544.171.844.171a2.364 2.364 0 0 0 2.363-2.363l.004-2.257V8.594h13.014c2.702 0 4.972.504 6.809 1.511 1.838 1.008 3.229 2.39 4.173 4.146.944 1.757 1.417 3.752 1.417 5.983 0 2.256-.476 4.259-1.426 6.011-.95 1.75-2.354 3.127-4.207 4.128-1.853 1.001-4.138 1.502-6.851 1.502h-6.606l-.014 9.086a3.59 3.59 0 0 0 2.559 3.437c.34.016.682.026 1.025.026 12.269 0 22.213-9.944 22.213-22.213C44.426 9.945 34.482 0 22.213 0Z'%3E%3C/path%3E%3C/svg%3E",
  cosmologyImage,
  "data:image/svg+xml,%3Csvg width='84' height='109' viewBox='0 0 84 109' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M36.8619 100.844C38.3604 102.411 39.8572 103.976 41.3912 105.474C42.2674 106.328 42.53 106.631 42.9431 107.108C43.176 107.377 43.4566 107.701 43.9219 108.21C50.0618 102.184 64.1194 88.2986 68.7109 82.7696C76.3284 73.5924 82.8618 63.9691 83.2581 51.3995C83.4925 43.9351 81.6286 36.5553 77.8797 30.1044C77.8128 30.8819 77.7632 31.5565 77.7185 32.1638C77.6365 33.2786 77.5712 34.1661 77.4466 35.0453C76.2631 42.1938 73.1796 48.8892 68.5212 54.4254C58.8751 67.0961 52.5594 73.5207 39.8837 86.4151C37.3044 89.0388 34.4617 91.9305 31.2741 95.1972C33.1867 97.0011 35.0256 98.9239 36.8619 100.844ZM17.2519 80.2107C17.9464 80.9641 18.8958 81.9939 19.3991 82.4968L19.3906 82.494C20.65 83.7526 21.7743 84.9158 22.8721 86.0516C24.6168 87.8568 26.2946 89.5927 28.3414 91.532C36.405 82.8956 41.9172 77.0954 46.0261 72.7716C53.6359 64.7641 56.4329 61.8209 61.7104 55.3062C66.113 50.0284 70.0548 44.38 73.492 38.4236C75.2104 35.7501 76.0704 32.6119 75.956 29.4324C75.8416 26.253 74.7583 23.1852 72.8523 20.6431C64.2921 9.4799 50.7837 2.28873 40.1429 4.72935C39.5938 4.92366 39.0925 5.2336 38.6726 5.63838C38.2528 6.04316 37.924 6.5334 37.7084 7.07621C34.0143 2.87686 30.9939 -0.0183563 24.8172 0.856745L26.7364 4.42818L16.4862 3.44227C17.1492 4.37473 17.745 5.22213 18.2987 6.00958C19.4473 7.64312 20.4146 9.01872 21.4231 10.3607C21.8608 10.9007 22.3511 11.3957 22.8866 11.8381C22.1305 12.7602 21.3728 13.6811 20.6151 14.6019C17.9828 17.8011 15.3513 20.9992 12.7949 24.2401C12.0646 25.1635 11.0965 26.6438 11.3796 27.4365C13.1264 32.1535 11.2182 35.9504 9.26375 39.8392C9.02969 40.305 8.79497 40.772 8.56579 41.2421C6.61656 45.2442 4.82732 49.3229 3.0366 53.4051C2.31777 55.0437 1.59871 56.6829 0.868962 58.3179C0.559764 58.7925 0.374146 59.3374 0.329108 59.9027C0.284069 60.468 0.381048 61.0356 0.611165 61.5535C0.841281 62.0714 1.19718 62.5231 1.64627 62.8672C2.09535 63.2113 2.62328 63.4368 3.18169 63.5231C6.4642 64.6519 9.81506 65.5696 13.2139 66.2705C17.5846 67.0547 20.1323 64.3982 20.2738 59.9147C20.331 57.9369 20.7956 55.9925 21.6382 54.2038C22.7822 51.7637 24.7444 49.8049 27.1817 48.6701C29.619 47.5352 32.3762 47.2965 34.9711 47.9957C36.8429 48.359 38.7786 48.1891 40.5591 47.5052C42.3396 46.8213 43.8938 45.6507 45.0457 44.1259C45.5608 43.5156 46.0881 42.9157 46.6152 42.3161C47.5627 41.2383 48.5094 40.1615 49.3825 39.0259C54.5146 32.3774 59.6072 25.7034 59.5137 16.4296C59.9928 17.85 60.3712 19.3026 60.646 20.7767C61.5094 27.911 58.0021 33.6361 53.9088 38.7503C42.5349 53.281 30.1031 66.945 16.7155 79.63C16.859 79.7845 17.044 79.9852 17.2519 80.2107Z' fill='%23BD081C'/%3E%3C/svg%3E%0A",
  akashImage,
];

const MAX_CONTAINER_WIDTH = "752px";

const Header = (props: {
  assets: DefaultNormalizedAsset[];
  isDefaultTheme?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Stack
      direction="vertical"
      space="$14"
      attributes={{
        position: "relative",
        width: {
          mobile: "100%",
          // Parent width + x padding
          tablet: "calc(100% + 64px)",
        },
      }}
    >
      <Stack
        direction="horizontal"
        space="$9"
        attributes={{
          position: "relative",
          alignItems: "center",
        }}
      >
        {props.isDefaultTheme ? (
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            leftIcon="arrowLeftSLine"
            iconSize="$2xl"
            attributes={{
              px: "$0",
            }}
          />
        ) : (
          <MeshButton
            width="$11"
            height="$11"
            px="$0"
            py="$0"
            colorScheme="secondary"
          >
            <Icon name="arrowLeftSLine" size="$2xl" color="inherit" />
          </MeshButton>
        )}

        <Text
          as="p"
          fontSize={{
            mobile: "$md",
            tablet: "$3xl",
          }}
          fontWeight="$medium"
          color="$text"
          lineHeight="$lg"
          attributes={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "$4",
          }}
        >
          <span>Create validator squad</span>

          <Box as="span" display="inline-block">
            <Icon
              name="informationLine"
              size={{
                mobile: "$md",
                tablet: "$xl",
              }}
              color="$textSecondary"
            />
          </Box>
        </Text>
      </Stack>

      <Stack
        direction="horizontal"
        space="$8"
        attributes={{
          overflow: "auto",
          zIndex: 1,
        }}
      >
        {props.assets.map((asset, index) => (
          <MeshTab
            key={asset.name}
            isActive={index === activeTab}
            onClick={() => setActiveTab(index)}
          >
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="20px"
                height="20px"
                attributes={{
                  src: asset?.imgSrc ?? "",
                  alt: asset.name,
                }}
              />

              <Text
                as="p"
                fontSize="$sm"
                fontWeight="$normal"
                color="inherit"
                lineHeight="$lg"
              >
                {asset.name}
              </Text>
            </Stack>
          </MeshTab>
        ))}
      </Stack>

      <Divider
        position="absolute"
        bottom="0"
        transform={{
          tablet: "translateX(-32px)",
        }}
        zIndex={0}
      />
    </Stack>
  );
};

// ==== Define your row data type
type MeshTableValidatorRow = {
  id: string;
  isSelected: boolean;
  validator: {
    name: string;
    logo: string;
  };
  votingPower: string;
  commission: string;
};

export const InterchainUITheme: Story = {
  args: {},
  render: (props) => {
    const { isReady, assets } = useMockData();
    const osmosis = assets.find((asset) => asset.symbol === "OSMO");
    const juno = assets.find((asset) => asset.symbol === "JUNO");
    const levana = assets.find((asset) => asset.symbol === "LVN");
    const stargaze = assets.find((asset) => asset.symbol === "STARS");

    const headerAssets = [osmosis, juno, stargaze].filter(
      Boolean,
    ) as DefaultNormalizedAsset[];

    const [rowsData, setRowsData] = useState<MeshTableValidatorRow[]>(() =>
      [...Array(40).keys()].map((index) => ({
        id: `row_${index}`,
        isSelected: false,
        validator: {
          name: `Validator ${index + 1}`,
          logo: validatorThumbnails[1] ?? "",
        },
        votingPower: "5.6%",
        commission: "5.6%",
      })),
    );

    const [pinnedRowIds, setPinnedRowIds] =
      React.useState<string[]>(defaultPinnedRowIds);

    const selectRow = (rowId: string) => {
      const row = rowsData.find((row) => row.id === rowId);

      if (row) {
        setRowsData((prevRowsData) => {
          const updatedRowsData = prevRowsData.map((prevRow) => {
            if (prevRow.id === row.id) {
              return {
                ...prevRow,
                isSelected: true,
              };
            }
            return prevRow;
          });

          return updatedRowsData;
        });

        setPinnedRowIds((prev) => {
          return Array.from(new Set([...prev, rowId]));
        });
      }
    };

    const unselectRow = (rowId: string) => {
      const row = rowsData.find((row) => row.id === rowId);

      if (row) {
        setRowsData((prevRowsData) => {
          const updatedRowsData = prevRowsData.map((prevRow) => {
            if (prevRow.id === row.id) {
              return {
                ...prevRow,
                isSelected: false,
              };
            }
            return prevRow;
          });

          return updatedRowsData;
        });

        setPinnedRowIds((prev) => {
          return prev.filter((id) => id !== rowId);
        });
      }
    };

    return (
      <Box
        overflow="hidden"
        backgroundColor="$cardBg"
        p={{
          mobile: "$8",
          tablet: "$12",
        }}
        borderRadius="$lg"
        maxWidth={MAX_CONTAINER_WIDTH}
      >
        <Header isDefaultTheme assets={headerAssets} />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="100%"
        >
          {/* Stake section */}
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            gap="$10"
            marginTop="40px"
            marginBottom="42px"
          >
            <MeshTable
              borderless
              rowHeight="$14"
              pinnedIds={pinnedRowIds}
              maxPinnedRows={4}
              columns={[
                {
                  id: "validator",
                  label: "Validator",
                  align: "left",
                  width: "300px",
                  render: (rowData: MeshTableValidatorRow) => (
                    <Box pl="$6">
                      <MeshTableChainCell
                        size="xs"
                        name={rowData.validator.name}
                        imgSrc={rowData.validator.logo}
                      />
                    </Box>
                  ),
                },
                {
                  id: "votingPower",
                  label: "Voting Power",
                  align: "left",
                  width: "200px",
                },
                {
                  id: "commission",
                  label: "Commission",
                  width: "200px",
                  align: "left",
                },
                {
                  id: "action",
                  width: "100px",
                  align: "right",
                  render: (
                    rowData: MeshTableValidatorRow,
                    column,
                    isPinned,
                  ) => (
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      {isPinned ? (
                        <MeshButton variant="text">Remove</MeshButton>
                      ) : (
                        <MeshButton variant="text" color="$textSuccess">
                          Select
                        </MeshButton>
                      )}
                    </Box>
                  ),
                },
              ]}
              data={rowsData}
              containerProps={{
                overflowX: "auto",
                maxWidth: "100%",
              }}
              tableProps={{
                width: {
                  mobile: "790px",
                  tablet: "100%",
                },
              }}
            />
          </Box>

          <Stack
            direction="vertical"
            space="$6"
            attributes={{
              paddingBottom: "$10",
            }}
          >
            <Button size="md">
              <Text
                color="inherit"
                as="span"
                attributes={{
                  width: {
                    mobile: "120px",
                    mdMobile: "264px",
                  },
                }}
              >
                Next
              </Text>
            </Button>

            <Button size="md" variant="ghost" intent="secondary">
              Pick random
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  },
};

const defaultPinnedRowIds = Array.from(
  { length: 20 },
  (_, index) => `row_${index}`,
);

export const MeshUICustomTheme: Story = {
  args: {},
  render: (props) => {
    const { isReady, assets } = useMockData();
    const osmosis = assets.find((asset) => asset.symbol === "OSMO");
    const juno = assets.find((asset) => asset.symbol === "JUNO");
    const levana = assets.find((asset) => asset.symbol === "LVN");
    const stargaze = assets.find((asset) => asset.symbol === "STARS");

    const headerAssets = [osmosis, juno, stargaze].filter(
      Boolean,
    ) as DefaultNormalizedAsset[];

    const [rowsData, setRowsData] = useState<MeshTableValidatorRow[]>(() =>
      [...Array(40).keys()].map((index) => ({
        id: `row_${index}`,
        isSelected: false,
        validator: {
          name: `Validator ${index + 1}`,
          logo: validatorThumbnails[1] ?? "",
        },
        votingPower: "5.6%",
        commission: "5.6%",
      })),
    );

    const [pinnedRowIds, setPinnedRowIds] =
      React.useState<string[]>(defaultPinnedRowIds);

    const selectRow = (rowId: string) => {
      const row = rowsData.find((row) => row.id === rowId);

      if (row) {
        setRowsData((prevRowsData) => {
          const updatedRowsData = prevRowsData.map((prevRow) => {
            if (prevRow.id === row.id) {
              return {
                ...prevRow,
                isSelected: true,
              };
            }
            return prevRow;
          });

          return updatedRowsData;
        });

        setPinnedRowIds((prev) => {
          return Array.from(new Set([...prev, rowId]));
        });
      }
    };

    const unselectRow = (rowId: string) => {
      const row = rowsData.find((row) => row.id === rowId);

      if (row) {
        setRowsData((prevRowsData) => {
          const updatedRowsData = prevRowsData.map((prevRow) => {
            if (prevRow.id === row.id) {
              return {
                ...prevRow,
                isSelected: false,
              };
            }
            return prevRow;
          });

          return updatedRowsData;
        });

        setPinnedRowIds((prev) => {
          return prev.filter((id) => id !== rowId);
        });
      }
    };

    return (
      <MeshProvider>
        <Box
          overflow="hidden"
          backgroundColor="$cardBg"
          p={{
            mobile: "$8",
            tablet: "$12",
          }}
          maxWidth={MAX_CONTAINER_WIDTH}
          borderRadius="$lg"
        >
          <Header assets={headerAssets} />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxWidth="100%"
          >
            {/* Stake section */}
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              gap="$10"
              marginTop="40px"
              marginBottom="42px"
            >
              <MeshTable
                borderless
                rowHeight="$14"
                pinnedIds={pinnedRowIds}
                maxPinnedRows={4}
                columns={[
                  {
                    id: "validator",
                    label: "Validator",
                    align: "left",
                    width: "300px",
                    render: (rowData: MeshTableValidatorRow) => (
                      <Box pl="$6">
                        <MeshTableChainCell
                          size="xs"
                          name={rowData.validator.name}
                          imgSrc={rowData.validator.logo}
                        />
                      </Box>
                    ),
                  },
                  {
                    id: "votingPower",
                    label: "Voting Power",
                    align: "left",
                    width: "200px",
                  },
                  {
                    id: "commission",
                    label: "Commission",
                    width: "200px",
                    align: "left",
                  },
                  {
                    id: "action",
                    width: "100px",
                    align: "right",
                    render: (
                      rowData: MeshTableValidatorRow,
                      column,
                      isPinned,
                    ) => (
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        {isPinned ? (
                          <MeshButton
                            variant="text"
                            onClick={() => unselectRow(rowData.id)}
                          >
                            Remove
                          </MeshButton>
                        ) : (
                          <MeshButton
                            variant="text"
                            color="$textSuccess"
                            onClick={() => selectRow(rowData.id)}
                          >
                            Select
                          </MeshButton>
                        )}
                      </Box>
                    ),
                  },
                ]}
                data={rowsData}
                containerProps={{
                  overflowX: "auto",
                  maxWidth: "100%",
                }}
                tableProps={{
                  width: {
                    mobile: "790px",
                    tablet: "100%",
                  },
                }}
              />
            </Box>

            <Stack
              direction="vertical"
              space="$0"
              attributes={{
                paddingBottom: "$10",
              }}
            >
              <MeshButton
                width={{
                  mobile: "120px",
                  mdMobile: "264px",
                }}
              >
                Next
              </MeshButton>
              <MeshButton
                variant="text"
                width={{
                  mobile: "120px",
                  mdMobile: "264px",
                }}
              >
                Pick random
              </MeshButton>
            </Stack>
          </Box>
        </Box>
      </MeshProvider>
    );
  },
};

export const ModalView: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isReady, assets } = useMockData();
    const osmosis = assets.find((asset) => asset.symbol === "OSMO");
    const juno = assets.find((asset) => asset.symbol === "JUNO");
    const levana = assets.find((asset) => asset.symbol === "LVN");
    const stargaze = assets.find((asset) => asset.symbol === "STARS");
    const headerAssets = [osmosis, juno, stargaze].filter(
      Boolean,
    ) as DefaultNormalizedAsset[];

    const [rowsData, setRowsData] = useState<MeshTableValidatorRow[]>(() =>
      [...Array(40).keys()].map((index) => ({
        id: `row_${index}`,
        isSelected: false,
        validator: {
          name: `Validator ${index + 1}`,
          logo: validatorThumbnails[1] ?? "",
        },
        votingPower: "5.6%",
        commission: "5.6%",
      })),
    );

    const [pinnedRowIds, setPinnedRowIds] =
      React.useState<string[]>(defaultPinnedRowIds);

    const selectRow = (rowId: string) => {
      const row = rowsData.find((row) => row.id === rowId);

      if (row) {
        setRowsData((prevRowsData) => {
          const updatedRowsData = prevRowsData.map((prevRow) => {
            if (prevRow.id === row.id) {
              return {
                ...prevRow,
                isSelected: true,
              };
            }
            return prevRow;
          });

          return updatedRowsData;
        });

        setPinnedRowIds((prev) => {
          return Array.from(new Set([...prev, rowId]));
        });
      }
    };

    const unselectRow = (rowId: string) => {
      const row = rowsData.find((row) => row.id === rowId);

      if (row) {
        setRowsData((prevRowsData) => {
          const updatedRowsData = prevRowsData.map((prevRow) => {
            if (prevRow.id === row.id) {
              return {
                ...prevRow,
                isSelected: false,
              };
            }
            return prevRow;
          });

          return updatedRowsData;
        });

        setPinnedRowIds((prev) => {
          return prev.filter((id) => id !== rowId);
        });
      }
    };

    return (
      <div>
        <MeshModal
          renderTrigger={(triggerProps = {}) => {
            const { ref, ...buttonProps } = triggerProps;
            return (
              <Button
                buttonRef={ref}
                {...buttonProps}
                onClick={() => setIsOpen(true)}
              >
                open
              </Button>
            );
          }}
          isOpen={isOpen}
          title={
            <>
              <Header assets={headerAssets} />

              <Divider
                position="absolute"
                bottom="0"
                transform="translateX(-40px)"
                zIndex={0}
              />
            </>
          }
          onClose={() => setIsOpen(false)}
        >
          <Box maxWidth={MAX_CONTAINER_WIDTH}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxWidth="100%"
            >
              {/* Stake section */}
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap="$10"
                marginTop="40px"
                marginBottom="42px"
              >
                <MeshTable
                  borderless
                  rowHeight="$14"
                  pinnedIds={pinnedRowIds}
                  maxPinnedRows={4}
                  columns={[
                    {
                      id: "validator",
                      label: "Validator",
                      align: "left",
                      width: "300px",
                      render: (rowData: MeshTableValidatorRow) => (
                        <Box pl="$6">
                          <MeshTableChainCell
                            size="xs"
                            name={rowData.validator.name}
                            imgSrc={rowData.validator.logo}
                          />
                        </Box>
                      ),
                    },
                    {
                      id: "votingPower",
                      label: "Voting Power",
                      align: "left",
                      width: "200px",
                    },
                    {
                      id: "commission",
                      label: "Commission",
                      width: "200px",
                      align: "left",
                    },
                    {
                      id: "action",
                      width: "100px",
                      align: "right",
                      render: (
                        rowData: MeshTableValidatorRow,
                        column,
                        isPinned,
                      ) => (
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          {isPinned ? (
                            <MeshButton
                              variant="text"
                              onClick={() => unselectRow(rowData.id)}
                            >
                              Remove
                            </MeshButton>
                          ) : (
                            <MeshButton
                              variant="text"
                              color="$textSuccess"
                              onClick={() => selectRow(rowData.id)}
                            >
                              Select
                            </MeshButton>
                          )}
                        </Box>
                      ),
                    },
                  ]}
                  data={rowsData}
                  containerProps={{
                    maxWidth: "792px",
                  }}
                />
              </Box>

              <Stack
                direction="vertical"
                space="$0"
                attributes={{
                  paddingBottom: "$10",
                }}
              >
                <MeshButton width="264px">Next</MeshButton>
                <MeshButton variant="text">Pick random</MeshButton>
              </Stack>
            </Box>
          </Box>
        </MeshModal>
      </div>
    );
  },
};
