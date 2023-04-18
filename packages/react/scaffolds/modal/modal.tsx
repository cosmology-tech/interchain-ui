import * as React from "react";
import * as dialog from "@zag-js/dialog";
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
}

const useStore = create(store);

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, forwardedRef) => {
    const theme = useStore((state) => state.theme);

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
    } = props;
    const id = React.useId();

    const [state, send] = useMachine(
      dialog.machine({
        defaultOpen: !!defaultIsOpen,
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
            <div ref={forwardedRef} className={className}>
              <div
                {...api.backdropProps}
                className={styles.modalBackdrop[theme]}
              />
              <div {...api.containerProps} className={styles.modalContainer}>
                <FadeIn isVisible={api.isOpen}>
                  <div {...api.contentProps} className={styles.modalContent}>
                    {title && React.cloneElement(title, api.titleProps)}
                    {description &&
                      React.cloneElement(description, api.descriptionProps)}

                    <div>{children}</div>

                    {closeButton &&
                      React.cloneElement(closeButton, api.closeTriggerProps)}
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
