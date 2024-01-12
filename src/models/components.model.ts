export type ComponentRef<T = HTMLElement> = T & ((el: T) => void);
export type Children = any; // TODO

export interface BaseComponentProps {
  className?: string;
  class?: string; // Fallback className
  classList?: string; // Fallback class
  children?: Children;
  forwardedRef?: any;
}

export type BaseState = {
  loaded: boolean;
};

export type CSS = Partial<CSSStyleDeclaration> & {
  [key: string]: Partial<CSSStyleDeclaration> | string;
};

export type NumberFormatOptions = {
  minimumFractionDigits: number;
  maximumFractionDigits: number;
};
