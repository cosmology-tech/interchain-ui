import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
  For,
} from "@builder.io/mitosis";
import { store } from "../../models/store";
import Box from "../box";
import type { MeshTableValidatorsCellProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshTableValidatorsCell(
  props: MeshTableValidatorsCellProps,
) {
  const state = useStore({
    theme: "light",
  });

  let cleanupRef = useRef<(() => void) | null>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box display="flex" position="relative">
      <For each={props.validators}>
        {(validator, index) => (
          <Box
            as="span"
            key={validator.name + index}
            display="inline-block"
            overflow="hidden"
            width="26px"
            height="24px"
            flexShrink={0}
            flexGrow={0}
            borderRadius="$full"
            backgroundColor="$white"
            borderColor={state.theme === "dark" ? "$black" : "$gray100"}
            borderWidth="1px"
            borderStyle="solid"
            marginLeft={index === 0 ? undefined : "-8px"}
          >
            <Box
              as="img"
              width="24px"
              height="24px"
              borderRadius="$full"
              attributes={{
                src: `${validator.imgSrc}`,
                alt: `validator-thumbnail-${index}`,
              }}
            />
          </Box>
        )}
      </For>
    </Box>
  );
}
