import {
  Show,
  onUpdate,
  useRef,
  useStore,
  useMetadata,
  useDefaultProps,
} from "@builder.io/mitosis";

import Box from "../box";
import type { AccordionProps } from "./accordion.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<AccordionProps>>({
  width: "$full",
  isExpanded: false,
  transition: "all 0.2s ease-out",
});

export default function Accordion(props: AccordionProps) {
  const state = useStore({
    isExpanded: props.isExpanded,
    onToggle() {
      if (props.onToggle) {
        props.onToggle();
        return;
      }
      state.isExpanded = !state.isExpanded;
    },
  });

  const contentRef = useRef<HTMLDivElement | null>(null);

  onUpdate(() => {
    state.isExpanded = props.isExpanded;
  }, [props.isExpanded]);

  return (
    <Box width={props.width}>
      <Box attributes={{ onClick: state.onToggle }}>
        <Show when={typeof props.renderTrigger === "function"}>
          {/* @ts-ignore */}
          {props.renderTrigger({ isExpanded: state.isExpanded })}
        </Show>
        <Show when={typeof props.renderTrigger !== "function"}>
          {props.renderTrigger}
        </Show>
      </Box>
      <Box
        overflow="hidden"
        transition={props.transition}
        opacity={state.isExpanded ? 1 : 0}
        height={`${state.isExpanded ? contentRef?.scrollHeight : 0}px`}
        ref={contentRef}
      >
        {props.renderContent}
      </Box>
    </Box>
  );
}
