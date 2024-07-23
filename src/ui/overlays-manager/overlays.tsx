export const OVERLAYS_MANAGER_ID = "interchain-ui-overlays-manager";

class Overlays {
  private static instance: Overlays;
  private overlayRoots: Map<Document, HTMLElement> = new Map();

  private constructor() {}

  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  public static getInstance(): Overlays {
    if (!Overlays.instance) {
      Overlays.instance = new Overlays();
    }
    return Overlays.instance;
  }

  public getOrCreateOverlayRoot(ownerDocument: Document): HTMLElement | null {
    if (!Overlays.isBrowser()) {
      return null;
    }

    if (!this.overlayRoots.has(ownerDocument)) {
      const root = ownerDocument.createElement("div");
      root.id = OVERLAYS_MANAGER_ID;
      ownerDocument.body.appendChild(root);
      this.overlayRoots.set(ownerDocument, root);
    }
    return this.overlayRoots.get(ownerDocument) || null;
  }

  public cleanup(): void {
    if (!Overlays.isBrowser()) {
      return;
    }

    this.overlayRoots.forEach((root, doc) => {
      doc.body.removeChild(root);
    });
    this.overlayRoots.clear();
  }
}

export const overlays = Overlays.getInstance();
