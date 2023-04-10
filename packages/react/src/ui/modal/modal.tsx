import * as React from "react";
import * as dialog from "@zag-js/dialog";

import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { useColorScheme } from "../hooks/use-color-scheme";
import FadeIn from "../fade-in";
import * as styles from "./modal.css";

type ElementRenderer = (props: any) => React.ReactNode;

export interface ModalProps {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  initialFocusRef?: React.MutableRefObject<any>;
  renderTrigger: ElementRenderer;
  renderTitle?: ElementRenderer;
  renderDescription?: ElementRenderer;
  renderCloseButton?: ElementRenderer;
  children?: React.ReactNode;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  className?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const scheme = useColorScheme();

  const {
    defaultIsOpen,
    onOpen,
    onClose,
    children,
    renderTrigger,
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
      {renderTrigger(api.triggerProps)}
      {api.isOpen && (
        <Portal>
          <div className={className}>
            <div
              {...api.backdropProps}
              className={styles.modalBackdrop[scheme]}
            />
            <div {...api.containerProps} className={styles.modalContainer}>
              <FadeIn isVisible={api.isOpen}>
                <div {...api.contentProps} className={styles.modalContent}>
                  <h2 {...api.titleProps}>Edit profile</h2>
                  <p {...api.descriptionProps}>
                    Make changes to your profile here. Click save when you are
                    done.
                  </p>

                  <div>{children}</div>

                  <button type="button" {...api.closeTriggerProps}>
                    Close
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
