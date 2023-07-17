import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import * as styles from "./bonding-card.css";
import { BondingCardProps } from "./bonding-card.types";

export default function BondingCard(props: BondingCardProps) {
  return (
    <Box
      className={styles.container}
      p="9"
      borderRadius="lg"
      backgroundColor="cardBg"
    >
      <Stack
        direction="vertical"
        attributes={{
          justifyContent: "center",
        }}
      >
        <Text size="2xl" weight="semibold" attributes={{ marginBottom: "3" }}>
          {props.title}
        </Text>
        <Text>{props.value}</Text>
      </Stack>
    </Box>
  );
}
