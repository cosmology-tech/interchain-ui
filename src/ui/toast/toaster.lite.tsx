import {
  useStore,
  useRef,
  onUpdate,
  onMount,
  onUnMount,
  useDefaultProps,
  useMetadata,
  For,
  Show,
} from "@builder.io/mitosis";
import clx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { lightThemeClass, darkThemeClass } from "../../styles/themes.css";
import {
  VISIBLE_TOASTS_AMOUNT,
  VIEWPORT_OFFSET,
  TOAST_WIDTH,
  GAP,
} from "./toast.constants";
import { ToastState } from "./toast.state";
import type { ToastsState } from "./toast.state";
import type {
  ToasterProps,
  Toast,
  ToastToDismiss,
  ToastHeight,
} from "./toast.types";
import ToastItem from "./toast.lite";
import {
  frontToastHeightVar,
  offsetVar,
  widthVar,
  gapVar,
  toaster,
} from "./toast.css";
import { store } from "../../models/store";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Toaster(props: ToasterProps) {
  useDefaultProps({
    colorful: true,
    hotkey: ["altKey", "KeyT"],
    position: "bottom-right",
    visibleToasts: VISIBLE_TOASTS_AMOUNT,
  });

  const state = useStore({
    theme: "light",
    toasts: [],
    heights: [],
    expanded: false,
    interacting: false,
    get positionTuple() {
      const [y, x] = props.position.split("-");
      return { x, y };
    },
    get hotkeyLabel() {
      return props.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    },
    handleToastEvent(toast: Toast | ToastToDismiss) {
      if ((toast as ToastToDismiss).dismiss) {
        ToastState.syncDisplayToasts((displayToasts) =>
          displayToasts.map((t) =>
            t.id === toast.id ? { ...t, delete: true } : t
          )
        );
        return;
      }

      ToastState.syncDisplayToasts((displayToasts) => {
        let returnToasts = [];

        const indexOfExistingToast = displayToasts.findIndex(
          (t) => t.id === toast.id
        );

        // Update the toast if it already exists
        if (indexOfExistingToast !== -1) {
          returnToasts = [
            ...displayToasts.slice(0, indexOfExistingToast),
            { ...displayToasts[indexOfExistingToast], ...toast },
            ...displayToasts.slice(indexOfExistingToast + 1),
          ];
          return returnToasts;
        }

        // Add toast on top if not exists
        returnToasts = [toast, ...displayToasts];
        return returnToasts;
      });
    },
    handleSyncToasts(displayToasts: ToastsState) {
      state.toasts = displayToasts;
    },
    removeToast(toast: Toast) {
      ToastState.syncDisplayToasts((displayToasts) =>
        displayToasts.filter(({ id }) => id !== toast.id)
      );
    },
    updateHeights(newHeights: ToastHeight[]) {
      state.heights = newHeights;
    },
  });

  const listRef = useRef<HTMLOListElement>(null);
  let lastFocusedElementRef = useRef<HTMLElement>(null);
  let isFocusWithinRef = useRef<boolean>(false);
  let cleanupToastState = useRef(null);
  let cleanupSyncToastState = useRef(null);
  let cleanupListeners = useRef(null);
  let cleanupUIStore = useRef(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupUIStore = store.subscribe((newState) => {
      state.theme = newState.theme;
    });

    cleanupToastState = ToastState.subscribe(state.handleToastEvent);
    cleanupSyncToastState = ToastState.subscribeDisplay(state.handleSyncToasts);
  });

  onUnMount(() => {
    if (typeof cleanupToastState === "function") {
      cleanupToastState();
    }
    if (typeof cleanupSyncToastState === "function") {
      cleanupSyncToastState();
    }
    if (typeof cleanupListeners === "function") {
      cleanupListeners();
    }
    if (typeof cleanupUIStore === "function") {
      cleanupUIStore();
    }
  });

  onUpdate(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (state.toasts.length <= 1) {
      state.expanded = false;
    }
  }, [state.toasts]);

  onUpdate(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = props.hotkey.every(
        (key) => (event as any)[key] || event.code === key
      );

      if (isHotkeyPressed) {
        state.expanded = true;
        listRef?.focus();
      }

      if (
        event.code === "Escape" &&
        (document.activeElement === listRef ||
          listRef?.contains(document.activeElement))
      ) {
        state.expanded = false;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    cleanupListeners = () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [props.hotkey]);

  onUpdate(() => {
    if (listRef) {
      return () => {
        if (lastFocusedElementRef) {
          lastFocusedElementRef.focus({ preventScroll: true });
          lastFocusedElementRef = null;
          isFocusWithinRef = false;
        }
      };
    }
  }, [listRef]);

  return (
    <section
      aria-label={`Notifications ${state.hotkeyLabel}`}
      tabIndex={-1}
      style={{
        visibility: state.toasts.length > 0 ? "visible" : "hidden",
      }}
    >
      <ol
        tabIndex={-1}
        ref={listRef}
        className={clx(
          {
            [lightThemeClass]: state.theme === "light",
            [darkThemeClass]: state.theme === "dark",
          },
          toaster,
          props.className
        )}
        data-interchain-toaster
        data-theme={state.theme}
        data-colorful={props.colorful}
        data-y-position={state.positionTuple.y}
        data-x-position={state.positionTuple.x}
        style={{
          ...assignInlineVars({
            [frontToastHeightVar]: `${state.heights[0]?.height}px`,
            [offsetVar]:
              typeof props.offset === "number"
                ? `${props.offset}px`
                : props.offset || VIEWPORT_OFFSET,
            [widthVar]: `${TOAST_WIDTH}px`,
            [gapVar]: `${GAP}px`,
          }),
          ...props.style,
        }}
        onBlur={(event) => {
          if (
            isFocusWithinRef &&
            !event.currentTarget.contains(event.relatedTarget as HTMLElement)
          ) {
            isFocusWithinRef = false;
            if (lastFocusedElementRef) {
              lastFocusedElementRef.focus({ preventScroll: true });
              lastFocusedElementRef = null;
            }
          }
        }}
        onFocus={(event) => {
          if (!isFocusWithinRef) {
            isFocusWithinRef = true;
            lastFocusedElementRef = event.relatedTarget as HTMLElement;
          }
        }}
        onMouseEnter={() => {
          state.expanded = true;
        }}
        onMouseMove={() => {
          state.expanded = true;
        }}
        onMouseLeave={() => {
          // Avoid setting expanded to false when interacting with a toast, e.g. swiping
          if (!state.interacting) {
            state.expanded = false;
          }
        }}
        onPointerDown={() => {
          state.interacting = true;
        }}
        onPointerUp={() => {
          state.interacting = false;
        }}
      >
        <For each={state.toasts}>
          {(toast: Toast, index) => (
            <ToastItem
              key={toast.id}
              index={index}
              toast={toast}
              duration={props.duration}
              className={props.toastOptions?.className}
              descriptionClassName={props.toastOptions?.descriptionClassName}
              invert={props.invert}
              visibleToasts={props.visibleToasts}
              closeButton={props.closeButton}
              interacting={state.interacting}
              position={props.position}
              style={props.toastOptions?.style}
              removeToast={state.removeToast}
              toasts={state.toasts}
              heights={state.heights}
              setHeights={state.updateHeights}
              expandByDefault={props.expand}
              expanded={state.expanded}
            />
          )}
        </For>
      </ol>
    </section>
  );
}
