import {
  useStore,
  useDefaultProps,
  useRef,
  onUpdate,
  onMount,
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
import Text from "../text";

import * as styles from "./tooltip.css";
import { TooltipProps } from "./tooltip.types";

export default function Tooltip(props: TooltipProps) {
  useDefaultProps({
    placement: "top",
  });
  const anchorRef = useRef(null);
  const floatingTargetRef = useRef(null);
  const arrowRef = useRef(null);
  const state = useStore<{
    hovered: boolean;
  }>({
    hovered: false,
  });
  onUpdate(() => {
    computePosition(anchorRef, floatingTargetRef, {
      placement: props.placement,
      middleware: [
        inline(),
        offset(12),
        shift(),
        flip(),
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
    }).then((res) => {
      const x = res.x;
      const y = res.y;
      const placement = res.placement;
      Object.assign(floatingTargetRef.style, {
        left: `${x}px`,
        top: `${y}px`,
        visibility: state.hovered ? "visible" : "hidden",
      });

      if (res.middlewareData.arrow) {
        const arrowX = res.middlewareData.arrow.x;
        const arrowY = res.middlewareData.arrow.y;

        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        }[placement.split("-")[0]];
        Object.assign(arrowRef.style, {
          visibility: state.hovered ? "visible" : "hidden",
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-2px",
        });
      }
    });
  }, [state.hovered]);

  return (
    <Box
      ref={anchorRef}
      className={styles.tooltip}
      attributes={{
        tabIndex: "1",
        onMouseEnter: () => (state.hovered = true),
        onFocus: () => (state.hovered = true),
        onBlur: () => (state.hovered = false),
        onMouseLeave: () => (state.hovered = false),
      }}
    >
      {props?.children}
      <Box
        ref={floatingTargetRef}
        px="$5"
        py="$3"
        backgroundColor="$text"
        borderRadius="$md"
        position="absolute"
        width="max-content"
        left="0"
        top="0"
        zIndex="1"
      >
        <Text color="$progressBg">{props.title}</Text>

        <Box
          ref={arrowRef}
          position="absolute"
          transform="rotate(45deg)"
          width="$5"
          height="$5"
          backgroundColor="$text"
        />
      </Box>
    </Box>
  );
}
