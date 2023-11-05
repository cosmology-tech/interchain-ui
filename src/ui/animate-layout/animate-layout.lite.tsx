import { onMount, onUpdate, useRef, useMetadata } from "@builder.io/mitosis";
import { animateLayout } from "./animate-layout.helper";
import type { AnimateLayoutProps } from "./animate-layout.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function AnimateLayout(props: AnimateLayoutProps) {
  let parentRef = useRef<HTMLDivElement>(null);

  onMount(() => {
    if (parentRef) {
      animateLayout(parentRef);
    }
  });

  onUpdate(() => {
    if (parentRef) {
      animateLayout(parentRef);
    }
  }, [parentRef, props.children]);

  return (
    <div
      ref={parentRef}
      className={props.className}
      style={{
        backfaceVisibility: "hidden",
      }}
    >
      {props.children}
    </div>
  );
}
