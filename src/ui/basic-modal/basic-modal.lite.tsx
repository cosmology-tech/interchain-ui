import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  onUpdate,
  useRef,
} from "@builder.io/mitosis";
import clsx from "clsx";
import autoAnimate from "@formkit/auto-animate";
import { store } from "../../models/store";
import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";
import type { ThemeVariant } from "../../models/system.model";
import type { BasicModalProps } from "./basic-modal.types";
import { modalHeader, modalContent, modalChildren } from "./basic-modal.css";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function BasicModal(props: BasicModalProps) {
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
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      preventScroll={true}
      header={
        <Stack
          className={modalHeader}
          attributes={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {/* Default title */}
          {props.title && typeof props.title === "string" ? (
            <Text fontSize="$xl" fontWeight="$semibold">
              {props?.title}
            </Text>
          ) : null}

          {/* Custom title */}
          {props.title && typeof props.title !== "string" ? props.title : null}

          {/* Close button */}
          <IconButton
            icon="closeFilled"
            iconSize="$4xl"
            variant="unstyled"
            onClick={(e) => {
              props.onClose?.(e);
            }}
          />
        </Stack>
      }
      className={props.modalContainerClassName}
      contentClassName={clsx(
        modalContent[state.theme],
        props?.modalContentClassName
      )}
      childrenClassName={modalChildren}
    >
      <div ref={parentRef}>{props.children}</div>
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
