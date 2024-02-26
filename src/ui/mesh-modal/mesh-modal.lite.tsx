import {
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  useDefaultProps,
  onUpdate,
  useRef,
} from "@builder.io/mitosis";
import clsx from "clsx";
import autoAnimate from "@formkit/auto-animate";
import { store } from "../../models/store";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import MeshButton from "../mesh-staking/mesh-button.lite";
import {
  modalHeader,
  modalContent,
  modalChildren,
  modalCloseButton,
  modalBackdropBg,
} from "./mesh-modal.css";
import {
  meshDarkThemeClass,
  meshLightThemeClass,
} from "../../styles/themes.css";

import type { ThemeVariant } from "../../models/system.model";
import type { MeshModalProps } from "./mesh-modal.types";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["modal"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshModalProps>>({
  closeOnClickaway: false,
});

export default function MeshModal(props: MeshModalProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<(() => void) | null>(null);
  const parentRef = useRef<HTMLDivElement>();

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    if (parentRef) {
      autoAnimate(parentRef);
    }
  }, [parentRef]);

  return (
    // @ts-expect-error
    <ScaffoldModal
      isOpen={props.isOpen}
      root={props.modalRoot}
      closeOnClickaway={true}
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      preventScroll={true}
      renderTrigger={props.renderTrigger}
      themeClassName={
        state.theme === "dark" ? meshDarkThemeClass : meshLightThemeClass
      }
      backdropClassName={
        state.theme === "light" ? modalBackdropBg.light : modalBackdropBg.dark
      }
      header={
        <Stack
          className={modalHeader}
          attributes={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Default title */}
          {props.title && typeof props.title === "string" ? (
            <Text fontSize="$xl" fontWeight="$semibold">
              {props?.title}
            </Text>
          ) : null}

          {/* Custom title */}
          {props.title && typeof props.title !== "string" ? props.title : null}

          {/* Custom close button */}
          {typeof props.renderCloseButton === "function" ? (
            props.renderCloseButton({
              onClose: props.onClose,
            })
          ) : (
            <MeshButton
              width="$11"
              height="$11"
              colorScheme="secondary"
              className={modalCloseButton}
              onClick={(e) => {
                props.onClose?.(e);
              }}
            >
              <Icon name="closeFilled" size="$3xl" color="inherit" />
            </MeshButton>
          )}
        </Stack>
      }
      className={props.modalContainerClassName}
      contentClassName={clsx(modalContent, props?.modalContentClassName)}
      childrenClassName={modalChildren}
    >
      <div ref={parentRef}>{props.children}</div>
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
