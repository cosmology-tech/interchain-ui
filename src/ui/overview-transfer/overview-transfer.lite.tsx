import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { sprinkles } from "../../styles/sprinkles.css";
import { OverviewTransferProps } from "./overview-transfer.types";

export default function OverviewTransfer(props: OverviewTransferProps) {
  return (
    <Stack className={styles.overviewTransfer} direction="column">
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "10" }}>
        {props.type}
      </Text>
      <TransferItem
        maxBtn={true}
        availableAmount={713.32}
        symbol="UMEE"
        denom="Umee"
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
      />
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
