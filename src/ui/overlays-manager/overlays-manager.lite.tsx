import { useRef, onMount, onUnMount, useMetadata } from "@builder.io/mitosis";
import { overlays } from "./overlays";
import { OverlaysManagerProps } from "./overlays-manager.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function OverlaysManager(props: OverlaysManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  let cleanupRef = useRef<(() => void) | null>(null);

  onMount(() => {
    if (containerRef) {
      const ownerDocument = containerRef.ownerDocument;
      const overlayRoot = overlays.getOrCreateOverlayRoot(ownerDocument);

      // Append children to the overlay root
      while (containerRef.firstChild) {
        overlayRoot.appendChild(containerRef.firstChild);
      }

      let zIndexCounter = 1;

      // Function to apply styles to direct children
      const applyStylesToChildren = () => {
        Array.from(overlayRoot.children).forEach((child, index) => {
          if (child instanceof HTMLElement) {
            child.style.position = "relative";
            child.style.zIndex = (index + 1).toString();
          }
        });
        zIndexCounter = overlayRoot.children.length + 1;
      };

      // Apply initial styles
      applyStylesToChildren();

      // Set up MutationObserver to watch for changes in children
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            applyStylesToChildren();
          }
        });
      });

      observer.observe(overlayRoot, { childList: true });

      // Cleanup function
      cleanupRef = () => {
        observer.disconnect();
        while (containerRef.firstChild) {
          containerRef.removeChild(containerRef.firstChild);
        }
      };
    }
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return <div ref={containerRef} style={{ display: "none" }} />;
}
