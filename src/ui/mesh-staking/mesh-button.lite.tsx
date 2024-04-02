import {
  useMetadata,
  useStore,
  useDefaultProps,
  useRef,
  Show,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { store } from "../../models/store";
import { baseButton } from "../button/button.css";
import type { MeshButtonProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshButtonProps>>({
  variant: "solid",
  colorScheme: "primary",
});

export default function MeshButton(props: MeshButtonProps) {
  const state = useStore({
    theme: "light",
    getSolidBg: () => {
      if (state.theme === "dark") {
        return props.colorScheme === "primary"
          ? {
              base: "$text",
              hover: "$textPlaceholder",
            }
          : {
              base: "$body",
              hover: "$body",
            };
      }

      return props.colorScheme === "primary"
        ? {
            base: "$text",
            hover: "$textPlaceholder",
          }
        : {
            base: "$background",
            hover: "$background",
          };
    },
    getTextColor: () => {
      return props.colorScheme === "primary"
        ? state.theme === "light"
          ? "$white"
          : "$accentText"
        : state.theme === "light"
          ? "$text"
          : "$text";
    },
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
    <>
      <Show when={props.variant === "solid"}>
        <Box
          as="button"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={state.getSolidBg()}
          color={state.getTextColor()}
          fontSize="$sm"
          fontWeight="$medium"
          py={props.px ?? "$5"}
          px={props.py ?? "$9"}
          borderRadius={props.borderRadius ?? "$md"}
          height={props.height ?? "$14"}
          width={props.width}
          {...props}
          {...props.attributes}
          className={clx(baseButton, props.className)}
          attributes={{
            ...props.domAttributes,
            onClick: (event) => props.onClick?.(event),
          }}
        >
          {props.children}
        </Box>
      </Show>

      <Show when={props.variant === "text"}>
        <Box
          as="button"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="transparent"
          color={
            props.color
              ? props.color
              : state.theme === "dark"
                ? {
                    base: "$textSecondary",
                    hover: "$gray100",
                  }
                : {
                    base: "$text",
                    hover: "$textSecondary",
                  }
          }
          fontSize="$sm"
          fontWeight="$normal"
          py="$6"
          px="$9"
          borderRadius="$md"
          height={props.height ?? "$14"}
          width={props.width}
          {...props}
          {...props.attributes}
          className={clx(baseButton, props.className)}
          attributes={{
            ...props.domAttributes,
            onClick: (event) => props.onClick?.(event),
          }}
        >
          {props.children}
        </Box>
      </Show>
    </>
  );
}
