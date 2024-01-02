import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
  useMetadata,
} from "@builder.io/mitosis";
import type { MeshStakingProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshStaking(props: MeshStakingProps) {
  return null;
}
