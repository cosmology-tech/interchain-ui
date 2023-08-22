import type { BaseComponentProps } from "../../models/components.model";

export type ToastType = "default" | "action" | "success" | "error" | "loading";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export type PromiseLike<Data = any> = Promise<Data> | (() => Promise<Data>);

export type PromiseData<ToastData = any> = ExternalToast & {
  loading: string | BaseComponentProps["children"];
  success:
    | string
    | BaseComponentProps["children"]
    | ((data: ToastData) => BaseComponentProps["children"] | string);
  error:
    | string
    | BaseComponentProps["children"]
    | ((error: any) => BaseComponentProps["children"] | string);
};

export interface Toast {
  id: number | string;
  title?: string | BaseComponentProps["children"];
  type?: ToastType;
  icon?: BaseComponentProps["children"];
  invert?: boolean;
  description?: string | BaseComponentProps["children"];
  duration?: number;
  delete?: boolean;
  important?: boolean;
  action?: {
    label: string;
    onClick: (event?: any) => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: (toast: Toast) => void;
  onAutoClose?: (toast: Toast) => void;
  promise?: PromiseLike;
  style?: any;
  className?: string;
  descriptionClassName?: string;
}

// ==== Toast component props
export interface ToastProps extends BaseComponentProps {
  toast: Toast;
  toasts: Toast[];
  index: number;
  expanded: boolean;
  invert: boolean;
  heights: ToastHeight[];
  setHeights: (heights: ToastHeight[]) => void;
  removeToast: (toast: Toast) => void;
  position: ToastPosition;
  visibleToasts: number;
  expandByDefault: boolean;
  closeButton: boolean;
  interacting: boolean;
  style?: any;
  duration?: number;
  className?: string;
  descriptionClassName?: string;
}

export interface ToastHeight {
  height: number;
  toastId: number | string;
}

interface ToastOptions {
  className?: string;
  descriptionClassName?: string;
  style?: any;
}

export interface ToasterProps extends BaseComponentProps {
  invert?: boolean;
  position?: ToastPosition;
  hotkey?: string[];
  colorful?: boolean;
  expand?: boolean;
  duration?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: ToastOptions;
  style?: any;
  offset?: string | number;
}

export enum SwipeStateTypes {
  SwipedOut = "SwipedOut",
  SwipedBack = "SwipedBack",
  NotSwiped = "NotSwiped",
}

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<Toast, "id" | "type" | "title"> & {
  id?: number | string;
};

// Misc
export interface ToastLoaderProps {
  visible?: boolean;
}
