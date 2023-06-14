import * as React from "react";
import * as dialog from "@zag-js/dialog";
import clx from "clsx";
import { create } from "zustand";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { store } from "../../models/store";
import FadeIn from "../fade-in";
import * as styles from "./modal.css";

export interface ModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  initialFocusRef?: React.MutableRefObject<any>;
  trigger?: React.ReactElement;
  header: React.ReactElement;
  children?: React.ReactNode;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  className?: string;
  contentClassName?: string;
  childrenClassName?: string;
}

const useStore = create(store);

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, forwardedRef) => {
    const themeStore = useStore((state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
    }));

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
      childrenClassName,
    } = props;
    const id = React.useId();

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
        context: React.useMemo(
          () => ({
            open: isOpen,
          }),
          [props.isOpen]
        ),
      }
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
                    data-modal-part="content"
                  >
                    {React.cloneElement(header, {
                      titleProps: api.titleProps,
                      descriptionProps: api.descriptionProps,
                      closeButtonProps: {
                        ...api.closeTriggerProps,
                        onClick: (event: any) => {
                          api.closeTriggerProps.onClick?.(event);
                          onClose?.();
                        },
                      },
                    })}

                    <div
                      className={childrenClassName}
                      data-modal-part="children"
                    >
                      {children}
                    </div>
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
