import {
  useStore,
  useDefaultProps,
  useRef,
  onUpdate,
  onMount,
  onUnMount,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import {
  computePosition,
  offset,
  shift,
  flip,
  arrow,
  inline,
  size,
} from "@floating-ui/dom";
import Box from "../box";
import { standardTransitionProperties } from "../shared/shared.css";
import * as styles from "./tooltip.css";

import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { TooltipProps } from "./tooltip.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<TooltipProps>>({
  placement: "top",
});

export default function Tooltip(props: TooltipProps) {
  const anchorRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);

  const state = useStore<{
    theme: ThemeVariant;
    isMounted: boolean;
    isShown: boolean;
    setTooltip: (isShown: boolean) => void;
    compute: () => void;
    getLatestRefs: () => {
      arrow: HTMLDivElement;
      anchor: HTMLDivElement;
      tooltip: HTMLDivElement;
    };
  }>({
    theme: "light",
    isMounted: false,
    isShown: false,
    setTooltip: (shouldShow) => {
      if (shouldShow) {
        state.isShown = true;
        state.compute();
      } else {
        state.isShown = false;
      }
    },
    getLatestRefs: () => {
      return {
        arrow: arrowRef,
        anchor: anchorRef,
        tooltip: tooltipRef,
      };
    },
    compute() {
      const latestRefs = state.getLatestRefs();

      if (latestRefs.anchor == null || latestRefs.tooltip == null) {
        return;
      }

      computePosition(latestRefs.anchor, latestRefs.tooltip, {
        placement: props.placement ?? "top-start",
        middleware: [
          inline(),
          offset(props.offset ?? 12),
          flip(),
          shift({ padding: props.surroundPadding ?? 4 }),
          arrow({
            element: arrowRef,
          }),
          size({
            apply({ availableWidth, availableHeight, elements }) {
              // Do things with the data, e.g.
              Object.assign(elements.floating.style, {
                maxWidth: `${availableWidth}px`,
                maxHeight: `${availableHeight}px`,
              });
            },
          }),
        ],
      }).then((result) => {
        const x = result.x;
        const y = result.y;
        const placement = result.placement;
        const arrowData = result.middlewareData.arrow;
        const { x: arrowX, y: arrowY } = arrowData;

        Object.assign(latestRefs.tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        }[placement.split("-")[0]];

        const endSide = {
          start: "start",
          end: "end",
        }[placement.split("-")[1]];

        const deltaX = endSide === "start" ? -12 : endSide === "end" ? 12 : 0;

        Object.assign(latestRefs.arrow.style, {
          left: arrowX != null ? `${arrowX + deltaX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px",
        });
      });
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.isMounted = true;
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    if (!state.isMounted) {
      return;
    }
    state.compute();
  }, [
    state.isMounted,
    state.isShown,
    props.placement,
    props.offset,
    props.surroundPadding,
  ]);

  return (
    <>
      <Box
        attributes={{
          "data-part-id": "tooltip-container",
        }}
      >
        <Box
          boxRef={anchorRef}
          display="flex"
          alignItems="center"
          cursor="help"
          width="fit-content"
          attributes={{
            tabIndex: "0",
            onMouseEnter: () => state.setTooltip(true),
            onMouseLeave: () => state.setTooltip(false),
            onFocus: () => state.setTooltip(true),
            onBlur: () => state.setTooltip(false),
          }}
        >
          {props.children}
        </Box>
      </Box>

      <div
        role="tooltip"
        data-is-open={state.isShown}
        ref={tooltipRef}
        className={clx(
          standardTransitionProperties,
          styles.tooltip({
            theme: state.theme,
            variant: "default",
          }),
        )}
      >
        {props.title}

        <div
          ref={arrowRef}
          className={styles.tooltipArrow}
          data-part-id="tooltip-arrow"
        />
      </div>
    </>
  );
}
