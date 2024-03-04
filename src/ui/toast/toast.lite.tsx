import {
  Show,
  useRef,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useMetadata,
} from "@builder.io/mitosis";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import {
  TOAST_LIFETIME,
  GAP,
  SWIPE_TRESHOLD,
  TIME_BEFORE_UNMOUNT,
} from "./toast.constants";
import Icon from "../icon";
import {
  // ==== css vars
  indexVar,
  toastsBeforeVar,
  zIndexVar,
  initialHeightVar,
  offsetVar,
  swipeAmountVar,
  // ==== classes
  toast,
  toastDescription,
  toastTitle,
  toastIcon,
  toastContent,
  toastCancelButton,
  toastButton,
  toastCloseButton,
  toastSpinner,
} from "./toast.css";
import { store } from "../../models/store";
import type { ToastHeight, ToastProps } from "./toast.types";
import type { IconName } from "../icon/icon.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Toast(props: ToastProps) {
  const toastRef = useRef<HTMLLIElement>(null);
  let cleanupTimerRef = useRef<(() => void) | null>(null);
  let restoreHeightsRef = useRef<(() => void) | null>(null);
  let closeTimerStartTimeRef = useRef<number>(0);
  let offset = useRef<number>(0);
  let lastCloseTimerStartTimeRef = useRef<number>(0);
  let pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const state = useStore({
    theme: "light",
    mounted: false,
    removed: false,
    swiping: false,
    swipeOut: false,
    offsetBeforeRemove: 0,
    initialHeight: 0,
    swipeAmount: "0px",
    get isFront() {
      return props.index === 0;
    },
    get isVisible() {
      return props.index + 1 <= props.visibleToasts;
    },
    get toastType() {
      return props.toast.type;
    },
    get positionTuple() {
      const [y, x] = props.position.split("-");
      return { x, y };
    },
    get invert() {
      return props.toast.invert || props.invert;
    },
    get disabled() {
      return props.toast.type === "loading";
    },
    get statusIconName(): IconName | null {
      if (props.toast.type === "success") return "checkFill";
      if (props.toast.type === "error") return "errorWarningFill";
      return null;
    },
    get heightIndex() {
      return (
        props.heights.findIndex(
          (height: ToastHeight) => height.toastId === props.toast.id
        ) || 0
      );
    },
    get duration() {
      return props.toast.duration || props.duration || TOAST_LIFETIME;
    },
    get toastsHeightBefore() {
      return props.heights.reduce((prev, curr, reducerIndex) => {
        // Calculate offset up untill current  toast
        if (reducerIndex >= state.heightIndex) {
          return prev;
        }

        return prev + curr.height;
      }, 0);
    },
    pxToNum(cssValue: string): number {
      return Number(cssValue.replace("px", "")) || 0;
    },
    deleteToast() {
      // Save the offset for the exit swipe animation
      state.removed = true;
      state.offsetBeforeRemove = offset;
      const oldHeights = props.heights;
      props.setHeights(
        oldHeights.filter((height) => height.toastId !== props.toast.id)
      );

      setTimeout(() => {
        props.removeToast(props.toast);
      }, TIME_BEFORE_UNMOUNT);
    },
    handleCloseButtonClick() {
      if (state.disabled) {
        return;
      }
      state.deleteToast();
      props.toast.onDismiss?.(props.toast);
    },
    handleCancelButtonClick() {
      state.deleteToast();
      if (props.toast.cancel?.onClick) {
        props.toast.cancel.onClick();
      }
    },
    handleActionButtonClick(event) {
      props.toast.action?.onClick(event);

      if (event.defaultPrevented) {
        return;
      }
      state.deleteToast();
    },
    handleOnPointerDown(event) {
      if (state.disabled) return;
      state.offsetBeforeRemove = offset;
      // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
      (event.target as HTMLElement).setPointerCapture(event.pointerId);

      if ((event.target as HTMLElement).tagName === "BUTTON") return;

      state.swiping = true;
      pointerStartRef = { x: event.clientX, y: event.clientY };
    },
    handleOnPointerUp() {
      if (state.swipeOut) {
        return;
      }

      pointerStartRef = null;

      const swipeAmountNum = Number(
        state.pxToNum(toastRef?.style.getPropertyValue(`${swipeAmountVar}`))
      );

      // Remove only if treshold is met
      if (Math.abs(swipeAmountNum) >= SWIPE_TRESHOLD) {
        state.offsetBeforeRemove = offset;
        props.toast.onDismiss?.(props.toast);
        state.deleteToast();
        state.swipeOut = true;
        return;
      }

      state.swipeAmount = "0px";
      state.swiping = false;
    },
    handleOnPointerMove(event) {
      if (!pointerStartRef) return;

      const yPosition = event.clientY - pointerStartRef.y;
      const xPosition = event.clientX - pointerStartRef.x;

      const clamp = state.positionTuple.y === "top" ? Math.min : Math.max;

      const clampedY = clamp(0, yPosition);
      const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
      const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

      if (isAllowedToSwipe) {
        state.swipeAmount = `${yPosition}px`;
      } else if (Math.abs(xPosition) > swipeStartThreshold) {
        // User is swiping in wrong direction so we disable swipe gesture
        // for the current pointer down interaction
        pointerStartRef = null;
      }
    },
  });

  let closeTimerRemainingTimeRef = useRef<number>(state.duration);
  let cleanupUIStore = useRef(null);

  onMount(() => {
    // Trigger enter animation without using CSS animation
    state.mounted = true;
    state.theme = store.getState().theme;

    cleanupUIStore = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUpdate(() => {
    offset = state.heightIndex * GAP + state.toastsHeightBefore;
  });

  onUpdate(() => {
    if (!state.mounted) {
      return;
    }

    const toastNode = toastRef;
    const originalHeight = toastNode.style.height;
    toastNode.style.height = "auto";
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;

    state.initialHeight = newHeight;

    const calcNewHeights = () => {
      const oldHeights = props.heights;

      const alreadyExists = oldHeights.find(
        (height) => height.toastId === props.toast.id
      );

      if (!alreadyExists) {
        return [{ toastId: props.toast.id, height: newHeight }, ...oldHeights];
      } else {
        return oldHeights.map((height) =>
          height.toastId === props.toast.id
            ? { ...height, height: newHeight }
            : height
        );
      }
    };

    props.setHeights(calcNewHeights());
  }, [
    state.mounted,
    props.toast.title,
    props.toast.description,
    props.toast.id,
  ]);

  onUpdate(() => {
    // Always clear timer in new update pass
    if (typeof cleanupTimerRef === "function") {
      cleanupTimerRef();
    }

    if (
      (props.toast.promise && state.toastType === "loading") ||
      props.toast.duration === Infinity
    ) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    // Pause the exit timer on hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
        // Get the elapsed time since the timer started
        const elapsedTime = new Date().getTime() - closeTimerStartTimeRef;

        closeTimerRemainingTimeRef = closeTimerRemainingTimeRef - elapsedTime;
      }

      lastCloseTimerStartTimeRef = new Date().getTime();
    };

    const startTimer = () => {
      closeTimerStartTimeRef = new Date().getTime();
      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        props.toast.onAutoClose?.(props.toast);
        state.deleteToast();
      }, closeTimerRemainingTimeRef);
    };

    if (props.expanded || props.interacting) {
      pauseTimer();
    } else {
      startTimer();
    }

    cleanupTimerRef = () => clearTimeout(timeoutId);
  }, [
    props.expanded,
    props.interacting,
    props.expandByDefault,
    props.toast,
    props.duration,
    props.toast.promise,
    state.deleteToast,
    state.toastType,
  ]);

  onUpdate(() => {
    const toastNode = toastRef;

    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;

      // Add toast height to heights array after the toast is mounted
      state.initialHeight = height;
      const oldHeights = props.heights;
      props.setHeights([{ toastId: props.toast.id, height }, ...oldHeights]);

      restoreHeightsRef = () => {
        const oldHeights = props.heights;
        props.setHeights(
          oldHeights.filter((height) => height.toastId !== props.toast.id)
        );
      };
    }
  }, [props.toast.id]);

  onUpdate(() => {
    if (props.toast.delete) {
      state.deleteToast();
    }
  }, [props.toast.delete]);

  onUnMount(() => {
    if (typeof cleanupTimerRef === "function") {
      cleanupTimerRef();
    }
    if (typeof restoreHeightsRef === "function") {
      restoreHeightsRef();
    }
    if (typeof cleanupUIStore === "function") {
      cleanupUIStore();
    }
  });

  return (
    <li
      aria-live={props.toast.important ? "assertive" : "polite"}
      aria-atomic="true"
      role="status"
      tabIndex={0}
      ref={toastRef}
      className={clx(toast, props.className, props.toast.className)}
      data-interchain-toast=""
      data-styled={true}
      data-theme={state.theme}
      data-mounted={state.mounted}
      data-promise={Boolean(props.toast.promise)}
      data-removed={state.removed}
      data-visible={state.isVisible}
      data-y-position={state.positionTuple.y}
      data-x-position={state.positionTuple.x}
      data-index={props.index}
      data-front={state.isFront}
      data-swiping={state.swiping}
      data-type={state.toastType}
      data-invert={state.invert}
      data-swipe-out={state.swipeOut}
      data-expanded={Boolean(
        props.expanded || (props.expandByDefault && state.mounted)
      )}
      style={{
        ...assignInlineVars({
          [indexVar]: `${props.index}`,
          [toastsBeforeVar]: `${props.index}`,
          [zIndexVar]: `${props.toasts.length - props.index}`,
          [offsetVar]: `${state.removed ? state.offsetBeforeRemove : offset}px`,
          [initialHeightVar]: props.expandByDefault
            ? "auto"
            : `${state.initialHeight}px`,
          [swipeAmountVar]: `${state.swipeAmount}`,
        }),
        ...props.css,
        ...props.toast.css,
      }}
      onPointerDown={state.handleOnPointerDown}
      onPointerUp={state.handleOnPointerUp}
      onPointerMove={state.handleOnPointerMove}
    >
      <Show when={props.closeButton}>
        <button
          aria-label="Close toast"
          data-disabled={state.disabled}
          data-close-button
          className={toastCloseButton}
          onClick={() => {
            state.handleCloseButtonClick();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-line-cap="round"
            stroke-line-join="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </Show>

      {/* Default title */}
      <Show when={state.toastType || props.toast.icon || props.toast.promise}>
        <div data-icon="" className={toastIcon}>
          <Show when={props.toast.promise && state.toastType === "loading"}>
            <div className={toastSpinner}>
              <Icon name="loaderFill" />
            </div>
          </Show>

          {/* Custom toast icon */}
          <Show when={props.toast.icon}>{props.toast.icon}</Show>

          {/* Default status icon */}
          <Show when={!props.toast.icon && state.statusIconName}>
            <Icon name={state.statusIconName} />
          </Show>
        </div>
      </Show>

      <div data-content="" className={toastContent}>
        <div data-title="" className={toastTitle}>
          {props.toast.title}
        </div>
        <Show when={props.toast.description}>
          <div
            data-description=""
            className={clx(toastDescription, props.descriptionClassName)}
          >
            {props.toast.description}
          </div>
        </Show>
      </div>

      <Show when={props.toast.cancel}>
        <button
          data-button
          data-cancel
          className={toastCancelButton}
          onClick={() => {
            state.handleCancelButtonClick();
          }}
        >
          {props.toast.cancel.label}
        </button>
      </Show>

      <Show when={props.toast.action}>
        <button
          data-button=""
          className={toastButton}
          onClick={(event) => state.handleActionButtonClick(event)}
        >
          {props.toast.action.label}
        </button>
      </Show>
    </li>
  );
}
