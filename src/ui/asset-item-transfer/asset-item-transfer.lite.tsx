import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import * as styles from "./asset-item-transfer.css";
import { sprinkles } from "../../styles/sprinkles.css";
import { AssetItemTransferProps } from "./asset-item-transfer.types";

export default function AssetItemTransfer(props: AssetItemTransferProps) {
  return (
    <Stack direction="column" className={styles.container}>
      <Stack>
        <Text size="xl" weight="semibold" attributes={{ marginRight: "3" }}>
          {props.type}
        </Text>
        <Text size="xl" weight="semibold">
          ATOM
        </Text>
      </Stack>

      <Stack attributes={{ marginTop: "13" }}>
        <Stack direction="column" attributes={{ flex: 1 }}>
          <Text
            color="textSecondary"
            weight="semibold"
            attributes={{ marginBottom: "6" }}
          >
            From Cosmos Hub
          </Text>
          <Stack
            align="center"
            attributes={{
              p: "6",
              backgroundColor: "cardBg",
              borderRadius: "lg",
            }}
          >
            <img
              className={styles.smImg}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Text color="textSecondary">atom1xy5y...m6wwz9a</Text>
          </Stack>
        </Stack>
        <Icon
          name="arrowRightLine"
          color="textSecondary"
          size="2xs"
          className={sprinkles({ px: "4" })}
        />
      </Stack>

      <Stack
        direction="column"
        attributes={{
          backgroundColor: "progressBg",
          borderRadius: "lg",
          paddingTop: "7",
          paddingLeft: "9",
          paddingRight: "5",
          paddingBottom: "8",
        }}
      >
        <Stack
          justify="flex-end"
          align="center"
          attributes={{ marginBottom: "7" }}
        >
          <Text color="textSecondary" weight="semibold">
            Available
          </Text>
          <Text
            weight="semibold"
            attributes={{ marginLeft: "4", marginRight: "9" }}
          >
            713.32
          </Text>
          <Button intent="text" size="xs">
            Max
          </Button>
        </Stack>
        <Stack justify="space-between" align="center">
          <Stack align="center">
            <img
              className={styles.img}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Stack direction="column" attributes={{ marginLeft: "9" }}>
              <Stack align="center">
                <Text
                  size="2xl"
                  weight="semibold"
                  attributes={{ marginRight: "5" }}
                >
                  UMEE
                </Text>
                <Icon name="arrowDownS" color="textSecondary" />
              </Stack>
              <Text color="textSecondary">Umee</Text>
            </Stack>
          </Stack>
          <Stack direction="column">
            <input />
            <Text
              color="textSecondary"
              size="xs"
              align="right"
              attributes={{ marginTop: "1" }}
            >
              ~ $98.23
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        justify="center"
        align="center"
        attributes={{ marginTop: "11", marginBottom: "13" }}
      >
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
        />
        <Icon
          name="arrowRightLine"
          color="textSecondary"
          size="xl"
          className={sprinkles({ mx: "9" })}
        />
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
        />
      </Stack>
      <Button intent="tertiary">
        <Stack align="center">
          <Text className={styles.btnText} size="lg" weight="semibold">
            Transfer
          </Text>
          <Icon
            name="timeLine"
            size="xs"
            className={sprinkles({
              marginLeft: "8",
              marginRight: "4",
            })}
          />
          <Text className={styles.btnText} size="xs">
            ≈ 20 seconds
          </Text>
        </Stack>
      </Button>
      <Button variant="unstyled">Cancel</Button>
    </Stack>
  );
}
