export const OVERLAYS_MANAGER_ID = "interchain-ui-overlays-manager";

class Overlays {
  private static instance: Overlays;
  private overlayRoots: Map<Document, HTMLElement> = new Map();

  private constructor() {}

  public static getInstance(): Overlays {
    if (!Overlays.instance) {
      Overlays.instance = new Overlays();
    }
    return Overlays.instance;
  }

  public getOrCreateOverlayRoot(ownerDocument: Document): HTMLElement {
    if (!this.overlayRoots.has(ownerDocument)) {
      const root = ownerDocument.createElement("div");
      root.id = OVERLAYS_MANAGER_ID;
      // root.style.position = "fixed";
      // root.style.top = "0";
      // root.style.left = "0";
      // root.style.width = "100%";
      // root.style.height = "100%";
      // root.style.pointerEvents = "none";
      // root.style.zIndex = "1000";
      ownerDocument.body.appendChild(root);
      this.overlayRoots.set(ownerDocument, root);
    }
    return this.overlayRoots.get(ownerDocument)!;
  }

  public cleanup() {
    this.overlayRoots.forEach((root, doc) => {
      doc.body.removeChild(root);
    });
    this.overlayRoots.clear();
  }
}

export const overlays = Overlays.getInstance();
