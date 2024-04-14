import { useMetadata } from "@builder.io/mitosis";
import Text from "../text";
import type { MeshTableAPRCellProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshTableAPRCell(props: MeshTableAPRCellProps) {
  return (
    <Text
      fontSize="$sm"
      fontWeight="$medium"
      color="$textSuccess"
      attributes={props.attributes}
    >
      {props.value}
    </Text>
  );
}
