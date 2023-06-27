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

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, forwardedRef) => {
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
  const id = useId();
  const [_internalOpen, _setInternalOpen] = useState(isOpen);

  // Add some transition to the close state to prevent abrupt close
  // useEffect(() => {
  //   if (props.isOpen && !_internalOpen) {
  //     _setInternalOpen(true);
  //   }

  //   if (!props.isOpen && _internalOpen) {
  //     setTimeout(() => {
  //       console.log("1000");
  //       _setInternalOpen(false);
  //     }, 300);
  //   }
  // }, [props.isOpen, _internalOpen]);

  useEffect(() => {
    if (props.isOpen) {
      _setInternalOpen(true);
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
          open: props.isOpen,
        }),
        [props.isOpen]
      ),
    }
  );

  const api = dialog.connect(state, send, normalizeProps);

  const onCloseButtonClick = (event: any) => {
    _setInternalOpen(false);

    // Add an artificial delay for the close animation to show
    setTimeout(() => {
      api.closeTriggerProps.onClick?.(event);
      onClose?.();
    }, 300);
  };

  return (
    <>
      {trigger && cloneElement(trigger, api.triggerProps)}

      <Portal>
        <FadeIn isVisible={_internalOpen}>
          <div
            ref={forwardedRef}
            className={clx(themeStore.themeClass, className)}
          >
            <div {...api.backdropProps} className={styles.modalBackdrop} />
            <div {...api.containerProps} className={styles.modalContainer}>
              <div
                {...api.contentProps}
                className={clx(styles.modalContent, contentClassName)}
                data-modal-part="content"
              >
                {header &&
                  cloneElement(header, {
                    titleProps: api.titleProps,
                    descriptionProps: api.descriptionProps,
                    closeButtonProps: {
                      ...api.closeTriggerProps,
                      onClick: onCloseButtonClick,
                    },
                  })}

                <div className={childrenClassName} data-modal-part="children">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Portal>
    </>
  );
});

export default Modal;
