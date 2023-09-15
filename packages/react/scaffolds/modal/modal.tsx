import React, {
  useMemo,
  useId,
  useState,
  useEffect,
  forwardRef,
  cloneElement,
} from "react";
import * as dialog from "@zag-js/dialog";
import clx from "clsx";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import FadeIn from "@/ui/fade-in";
import useTheme from "../hooks/use-theme";
import * as styles from "./modal.css";

export interface ModalProps {
  isOpen: boolean;
  onOpen?: (event?: React.SyntheticEvent) => void;
  onClose?: (event?: React.SyntheticEvent) => void;
  initialFocusRef?: React.MutableRefObject<any>;
  trigger?: React.ReactElement;
  header: React.ReactNode;
  children?: React.ReactNode;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  className?: string;
  contentStyles?: React.CSSProperties;
  contentClassName?: string;
  childrenClassName?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, forwardedRef) => {
  const { themeClass } = useTheme();

  const {
    isOpen,
    onOpen,
    onClose,
    children,
    trigger,
    header,
    initialFocusRef,
    closeOnClickaway = true,
    preventScroll = true,
    role = `dialog`,
    className,
    contentClassName,
    contentStyles,
    childrenClassName,
  } = props;
  const id = useId();
  const [_internalOpen, _setInternalOpen] = useState(isOpen);

  useEffect(() => {
    if (props.isOpen) {
      _setInternalOpen(true);
    } else {
      // Add an artificial delay for the close animation to show
      setTimeout(() => {
        _setInternalOpen(false);
      }, 300);
    }
  }, [props.isOpen]);

  const [state, send] = useMachine(
    dialog.machine({
      onOpen,
      onClose,
      id,
      initialFocusEl: initialFocusRef?.current,
      closeOnOutsideClick: closeOnClickaway,
      preventScroll,
      role,
    }),
    {
      context: useMemo(
        () => ({
          open: _internalOpen,
        }),
        [_internalOpen]
      ),
    }
  );

  const api = dialog.connect(state, send, normalizeProps);

  const onCloseButtonClick = (event: any) => {
    _setInternalOpen(false);
    api.closeTriggerProps.onClick?.(event);
    onClose?.();
  };

  return (
    <>
      {trigger && cloneElement(trigger, api.triggerProps)}

      {api.isOpen && (
        <Portal>
          <div
            ref={forwardedRef}
            className={clx(themeClass, className)}
            style={{
              position: "relative",
              zIndex: 999,
            }}
          >
            <FadeIn isVisible={api.isOpen}>
              <div {...api.backdropProps} className={styles.modalBackdrop} />
              <div {...api.containerProps} className={styles.modalContainer}>
                <div
                  {...api.contentProps}
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
                        titleProps: api.titleProps,
                        descriptionProps: api.descriptionProps,
                        closeButtonProps: {
                          ...api.closeTriggerProps,
                          onClick: onCloseButtonClick,
                        },
                      })
                    : null}

                  <div className={childrenClassName} data-modal-part="children">
                    {children}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Portal>
      )}
    </>
  );
});

export default Modal;
