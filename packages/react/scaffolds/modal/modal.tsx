import React, {
  useMemo,
  useId,
  useState,
  useEffect,
  forwardRef,
  cloneElement,
} from "react";
import clsx from "clsx";
import * as dialog from "@zag-js/dialog";
import clx from "clsx";
import { create } from "zustand";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { store } from "../../models/store";
import Box from "../box";
import * as styles from "./modal.css";

export interface ModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  animateBack?: () => void;
  animateNext?: () => void;
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
    animateBack,
    animateNext,
  } = props;
  const id = useId();
  const [_internalOpen, _setInternalOpen] = useState(isOpen);
  const [animateOpen, setAnimateOpen] = useState(isOpen);

  useEffect(() => {
    if (props.isOpen) {
      _setInternalOpen(true);
      setAnimateOpen(true);
    } else {
      // Add an artificial delay for the close animation to show
        setAnimateOpen(false);
      setTimeout(() => {
        _setInternalOpen(false);
      }, 200);
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
    setAnimateOpen(false);
    setTimeout(() => {
      _setInternalOpen(false);
      api.closeTriggerProps.onClick?.(event);
      onClose?.();
    }, 200);
  };

  return (
    <>
      {trigger && cloneElement(trigger, api.triggerProps)}

      {api.isOpen && (
        <Portal>
          <div
            className={clx(themeStore.themeClass, className)}
            style={{
              position: "relative",
              zIndex: 999,
            }}
          >
            <Box isVisible={api.isOpen}>
              <div
                {...api.backdropProps}
                className={clsx(
                  styles.modalBackdrop,
                  animateOpen ? styles.activeBg : styles.reverseBg
                )}
              />
              <div {...api.containerProps} className={styles.modalContainer}>
                <div
                  ref={forwardedRef}
                  {...api.contentProps}
                  className={clx(
                    styles.modalContent,
                    contentClassName,
                    animateOpen ? styles.activeContent : styles.reverseContent
                  )}
                  data-modal-part="content"
                  style={{
                    width: "fit-content",
                    margin: "0 auto",
                  }}
                >
                  <div>
                    {header &&
                      cloneElement(header, {
                        titleProps: api.titleProps,
                        descriptionProps: api.descriptionProps,
                        closeButtonProps: {
                          ...api.closeTriggerProps,
                          onClick: onCloseButtonClick,
                        },
                        animateBack,
                      })}

                    <div
                      className={childrenClassName}
                      data-modal-part="children"
                    >
                      {children &&
                        cloneElement(children, {
                          animateNext,
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </Portal>
      )}
    </>
  );
});

export default Modal;
