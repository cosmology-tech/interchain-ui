import * as React from "react";
import * as dialog from "@zag-js/dialog";
import clx from "clsx";
import { create } from "zustand";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { store } from "../../models/store";
import FadeIn from "../fade-in";
import * as styles from "./modal.css";

export interface ModalProps {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  initialFocusRef?: React.MutableRefObject<any>;
  trigger?: React.ReactElement;
  title?: React.ReactElement;
  description?: React.ReactElement;
  closeButton?: React.ReactElement;
  children?: React.ReactNode;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  className?: string;
  contentClassName?: string;
  childrenClassName?: string;
  headerClassName?: string;
  closeButtonClassName?: string;
}

const useStore = create(store);

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, forwardedRef) => {
    const themeStore = useStore((state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
    }));

    const {
      defaultIsOpen,
      onOpen,
      onClose,
      children,
      trigger,
      title,
      description,
      closeButton,
      initialFocusRef,
      closeOnClickaway = true,
      preventScroll = true,
      role = `dialog`,
      className,
      contentClassName,
      headerClassName,
      childrenClassName,
      closeButtonClassName,
    } = props;
    const id = React.useId();

    const [state, send] = useMachine(
      dialog.machine({
        open: !!defaultIsOpen,
        onOpen,
        onClose,
        id,
        initialFocusEl: initialFocusRef?.current,
        closeOnOutsideClick: closeOnClickaway,
        preventScroll,
        role,
      })
    );

    const api = dialog.connect(state, send, normalizeProps);

    return (
      <>
        {trigger && React.cloneElement(trigger, api.triggerProps)}

        {api.isOpen && (
          <Portal>
            <div
              ref={forwardedRef}
              className={clx(themeStore.themeClass, className)}
            >
              <div
                {...api.backdropProps}
                className={styles.modalBackdrop[themeStore.theme]}
              />
              <div {...api.containerProps} className={styles.modalContainer}>
                <FadeIn isVisible={api.isOpen}>
                  <div
                    {...api.contentProps}
                    className={clx(styles.modalContent, contentClassName)}
                  >
                    <div className={clx(styles.modalHeader, headerClassName)}>
                      {title && React.cloneElement(title, api.titleProps)}
                      {description &&
                        React.cloneElement(description, api.descriptionProps)}

                      <div
                        className={clx(
                          styles.modalCloseButton,
                          closeButtonClassName
                        )}
                      >
                        {closeButton &&
                          React.cloneElement(
                            closeButton,
                            api.closeTriggerProps
                          )}
                      </div>
                    </div>

                    <div className={childrenClassName}>{children}</div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  }
);

export default Modal;
