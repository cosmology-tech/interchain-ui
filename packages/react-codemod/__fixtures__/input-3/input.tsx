import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import type { AccordionProps } from "./accordion.types";

function Accordion(props: AccordionProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(() => props.isExpanded);

  function toggleExpanded() {
    if (typeof props.onToggle === "function") {
      props.onToggle();
      return;
    }
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    setIsExpanded(props.isExpanded);
  }, [props.isExpanded]);

  return (
    <Box width={props.width}>
      <div onClick={(event) => toggleExpanded()}>
        {typeof props.renderTrigger === "function" ? (
          <>
            {props.renderTrigger({
              isExpanded: isExpanded,
            })}
          </>
        ) : null}
        {typeof props.renderTrigger !== "function" ? (
          <>{props.renderTrigger}</>
        ) : null}
      </div>
      <Box
        overflow="hidden"
        transition={props.transition}
        opacity={isExpanded ? 1 : 0}
        height={`${isExpanded ? contentRef.current?.scrollHeight : 0}px`}
        ref={contentRef}
      >
        {props.renderContent}
      </Box>
    </Box>
  );
}

Accordion.defaultProps = {
  width: "$full",
  isExpanded: false,
  transition: "all 0.2s ease-out",
};

export default Accordion;
