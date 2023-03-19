export type ComponentRef<T = HTMLElement> = T & ((el: T) => void);

export interface BaseComponentProps<T = HTMLDivElement> {
  className?: string;
  class?: string; // Fallback className
  classList?: string; // Fallback class
  children?: Children;
  forwardedRef?: ComponentRef<T>;
}

export type BaseState = {
  loaded: boolean;
};

export type Children = any; // TODO

export type CSS = Partial<CSSStyleDeclaration> & {
  [key: string]: Partial<CSSStyleDeclaration> | string;
};
