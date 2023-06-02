
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import * as styles from "./bonding-card.css";
import { BondingCardProps } from "./bonding-card.types";

export default function BondingCard(props: BondingCardProps) {
  return (
    <Box px="9" py="9" borderRadius="lg" backgroundColor="cardBg">
      <Stack direction="column" justify="center">
        <Text size="2xl" weight="semibold" marginBottom="4">{props.title}</Text>
        <Text>{props.value}</Text>
      </Stack>
    </Box>
  );
}
