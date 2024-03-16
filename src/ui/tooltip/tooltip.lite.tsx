import {
  useStore,
  useDefaultProps,
  useRef,
  onUpdate,
  onMount,
  useMetadata,
} from "@builder.io/mitosis";
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
import type { TooltipProps } from "./tooltip.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Tooltip(props: TooltipProps) {
  useDefaultProps({
    placement: "top",
  });
  const anchorRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);

  const state = useStore<{
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

  onMount(() => {
    state.isMounted = true;
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

      <Box
        attributes={{
          role: "tooltip",
        }}
        display={state.isShown ? "block" : "none"}
        boxRef={tooltipRef}
        px="$5"
        py="$3"
        backgroundColor="$text"
        borderRadius="$md"
        position="absolute"
        width="max-content"
        zIndex="1"
        className={standardTransitionProperties}
        rawCSS={{
          left: "0",
          top: "0",
        }}
      >
        {props.title}

        <Box
          boxRef={arrowRef}
          position="absolute"
          transform="rotate(45deg)"
          width="$5"
          height="$5"
          backgroundColor="$text"
          attributes={{
            "data-part-id": "tooltip-arrow",
          }}
        />
      </Box>
    </>
  );
}
