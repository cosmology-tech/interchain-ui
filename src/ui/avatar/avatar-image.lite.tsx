import {
  Show,
  onUpdate,
  useStore,
  useRef,
  onUnMount,
} from "@builder.io/mitosis";
import cls from "clsx";
import AvatarName from "./avatar-name.lite";
import { avatarImg } from "./avatar.css";
import type { AvatarImageProps } from "./avatar.types";

export default function AvatarImage(props: AvatarImageProps) {
  let imgRef = useRef<HTMLImageElement | null>(null);
  let cleanupRef = useRef(null);

  const state = useStore<{
    status: "loading" | "failed" | "pending" | "loaded";
    resolvedStatus: "loading" | "failed" | "pending" | "loaded";
    showFallback: boolean;
    transitionState: "idle" | "entered";
    load: () => void;
    flush: () => void;
  }>({
    status: "pending",
    transitionState: "idle",
    load() {
      if (!props.src) return;

      state.flush();

      const img = new Image();
      img.src = props.src;
      if (props.crossOrigin) img.crossOrigin = props.crossOrigin;
      if (props.srcSet) img.srcset = props.srcSet;
      if (props.sizes) img.sizes = props.sizes;
      if (props.loading) img.loading = props.loading;

      img.onload = (event) => {
        state.flush();
        state.status = "loaded";
        state.transitionState = "entered";
        props.onLoad?.(event);
      };
      img.onerror = (error) => {
        state.flush();
        state.status = "failed";
        props.onError?.(error);
      };

      imgRef = img;
    },
    flush() {
      if (imgRef) {
        imgRef.onload = null;
        imgRef.onerror = null;
        imgRef = null;
        state.transitionState = "idle";
      }
    },
    get resolvedStatus() {
      return props.ignoreFallback ? "loaded" : state.status;
    },
    get showFallback() {
      return !props.src || state.resolvedStatus !== "loaded";
    },
  });

  onUpdate(() => {
    state.status = props.src ? "loading" : "pending";
  }, [props.src]);

  onUpdate(() => {
    if (props.ignoreFallback) return;

    if (state.status === "loading") {
      state.load();
    }

    cleanupRef = () => {
      state.flush();
    };
  }, [
    state.status,
    props.ignoreFallback,
    props.crossOrigin,
    props.srcSet,
    props.sizes,
    props.onLoad,
    props.onError,
    props.loading,
  ]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  return (
    <Show
      when={state.showFallback}
      else={
        <img
          ref={imgRef}
          src={props.src}
          srcset={props.srcSet as any}
          alt={props.name}
          onLoad={props.onLoad}
          width={props.width}
          height={props.height}
          referrerPolicy={props.referrerPolicy as any}
          crossOrigin={(props.crossOrigin as any) ?? undefined}
          loading={props.loading}
          className={cls(avatarImg, props.className)}
          data-status={state.resolvedStatus}
          style={{
            opacity: `${state.transitionState === "idle" ? 0 : 1}`,
            transition:
              state.transitionState === "entered"
                ? "opacity 150ms cubic-bezier(0.7, 0, 0.84, 0)"
                : "none !important",
          }}
        />
      }
    >
      <AvatarName
        name={props.name}
        getInitials={props.getInitials}
        showInitials={props.fallbackMode === "initials"}
      />
    </Show>
  );
}
