import React, { forwardRef, cloneElement } from "react";
import clx from "clsx";
import FadeIn from "@/ui/fade-in";
import useTheme from "../hooks/use-theme";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  useTransitionStyles,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
  useId,
} from "@floating-ui/react";
import * as styles from "./modal.css";

interface DialogOptions {
  initialOpen?: boolean;
  open?: boolean;
  closeOnClickaway?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function useClickAway(cb: (e: Event) => void) {
  const ref = React.useRef(null);
  const refCb = React.useRef(cb);

  React.useEffect(() => {
    refCb.current = cb;
  });

  React.useEffect(() => {
    const handler = (e: Event) => {
      const element = ref.current;
      if (element && !element.contains(e.target)) {
        refCb.current(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}

function useDialog({
  initialOpen = false,
  open: controlledOpen,
  closeOnClickaway,
  onOpenChange: setControlledOpen,
}: DialogOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const clickawayRef = useClickAway(() => {
    if (closeOnClickaway) {
      setOpen(false);
    }
  });

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      clickawayRef,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  );
}

export interface ModalProps {
  isOpen: boolean;
  initialOpen?: boolean;
  onOpen?: (event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
  initialFocusRef?: React.MutableRefObject<any>;
  renderTrigger?: (props: any) => React.ReactNode;
  header: React.ReactNode;
  children?: React.ReactNode;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  className?: string;
  // This is the themeClass created by using vanilla css createTheme function
  themeClassName?: string;
  contentStyles?: React.CSSProperties;
  contentClassName?: string;
  backdropClassName?: string;
  childrenClassName?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, forwardedRef) => {
  const { themeClass } = useTheme();

  const {
    isOpen,
    initialOpen,
    onOpen,
    onClose,
    children,
    renderTrigger,
    header,
    initialFocusRef,
    root,
    closeOnClickaway = true,
    preventScroll = true,
    role = `dialog`,
    className,
    themeClassName,
    backdropClassName,
    contentClassName,
    contentStyles,
    childrenClassName,
  } = props;

  const dialog = useDialog({
    initialOpen,
    open: isOpen,
    onOpenChange: (isOpen) => {
      if (isOpen) {
        onOpen();
      } else {
        onClose();
      }
    },
    closeOnClickaway,
  });

  const id = useId();

  const { styles: transitionStyles } = useTransitionStyles(dialog.context);

  React.useEffect(() => {
    dialog.setLabelId(id);
    return () => dialog.setLabelId(undefined);
  }, [id, dialog.setLabelId]);

  const onCloseButtonClick = (event: any) => {
    dialog.setOpen(false);
    onClose?.(event);
  };

  const dialogRef = useMergeRefs([dialog.refs.setFloating, forwardedRef]);
  const triggerProps = dialog.getReferenceProps({
    ref: dialog.refs.setReference,
  });

  return (
    <>
      {typeof renderTrigger === "function" ? renderTrigger(triggerProps) : null}

      {dialog.open && (
        <FloatingPortal root={root}>
          <FloatingOverlay
            className={clx(themeClassName)}
            lockScroll={preventScroll}
            style={{
              ...transitionStyles,
              zIndex: 999,
            }}
          >
            <FloatingFocusManager context={dialog.context}>
              <FadeIn isVisible={dialog.open}>
                <div
                  ref={dialogRef}
                  aria-labelledby={dialog.labelId}
                  aria-describedby={dialog.descriptionId}
                  {...dialog.getFloatingProps({
                    role: role,
                    className: clx(
                      // Make sure themeClass is overridable
                      themeClassName ? themeClassName : themeClass,
                      className
                    ),
                    style: {
                      position: "relative",
                      zIndex: 999,
                    },
                  })}
                >
                  <div className={styles.modalContainer}>
                    <div
                      ref={dialog.clickawayRef}
                      className={clx(styles.modalContent, contentClassName)}
                      data-modal-part="content"
                      style={{
                        width: "fit-content",
                        margin: "0 auto",
                        ...contentStyles,
                      }}
                    >
                      {header && React.isValidElement(header)
                        ? cloneElement(header, {
                            // @ts-expect-error
                            id,
                            closeButtonProps: {
                              onClick: onCloseButtonClick,
                            },
                          })
                        : null}

                      <div
                        className={childrenClassName}
                        data-modal-part="children"
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={clx(
                    themeClassName,
                    backdropClassName ? backdropClassName : styles.modalBackdrop
                  )}
                  data-testid="modal-backdrop"
                />
              </FadeIn>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
});

export default Modal;
