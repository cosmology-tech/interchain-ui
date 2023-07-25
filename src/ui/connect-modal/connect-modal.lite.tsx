import {
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  onUpdate,
  useRef,
} from "@builder.io/mitosis";
import autoAnimate, { getTransitionSizes } from "@formkit/auto-animate";
import { sprinkles as s } from "../../styles/sprinkles.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalProps } from "./connect-modal.types";
import { modalContent, modalChildren } from "./connect-modal.css";

useMetadata({ isAttachedToShadowDom: true, scaffolds: ["modal"] });

export default function ConnectModal(props: ConnectModalProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);
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
      autoAnimate(parentRef, (el, action, oldCoords, newCoords) => {
        let keyframes;
        let duration = 200;
        if (action === "add") {
          keyframes = [
            { transform: "scale(0)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
          ];
        }
        if (action === "remove") {
          duration = 300;
          keyframes = [
            { transform: "scale(1)", opacity: 0.8 },
            { transform: "scale(0)", opacity: 0 },
          ];
        }
        if (action === "remain") {
          duration = 400;
          // use the getTransitionSizes() helper function to
          // get the old and new widths of the elements
          const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
            el,
            oldCoords,
            newCoords
          );
          // set up our steps with our positioning keyframes
          let start = {};
          let mid = {};
          let end = {};
          if (widthFrom !== widthTo) {
            start.width = `${widthFrom}px`;
            mid.width = `${
              widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05
            }px`;
            end.width = `${widthTo}px`;
          }
          if (heightFrom !== heightTo) {
            start.height = `${heightFrom}px`;
            mid.height = `${
              heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05
            }px`;
            end.height = `${heightTo}px`;
          }
          start.transform = "scale(1)";
          start.opacity = 0;
          mid.transform = "scale(0.95)";
          mid.opacity = 0.9;
          end.transform = "scale(1)";
          end.opacity = 1;
          keyframes = [start, mid, end];
        }
        return new KeyframeEffect(el, keyframes, {
          duration: duration,
          easing: "ease",
        });
      });
    }
  }, [parentRef]);

  return (
    // @ts-expect-error
    <ScaffoldModal
      isOpen={props.isOpen}
      onOpen={() => props.onOpen?.()}
      onClose={() => props.onClose?.()}
      header={props.header}
      className={props.modalContainerClassName}
      contentClassName={modalContent[state.theme]}
      childrenClassName={modalChildren}
    >
      <div className={s({ minHeight: "30" })} ref={parentRef}>
        {props.children}
      </div>
      {/* @ts-expect-error */}
    </ScaffoldModal>
  );
}
