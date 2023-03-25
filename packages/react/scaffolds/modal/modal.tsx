import * as React from "react";
import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";

export default function Dialog(props) {
  const [state, send] = useMachine(dialog.machine({ id: "1" }));

  const api = dialog.connect(state, send, normalizeProps);

  return (
    <div>
      <button {...api.triggerProps}>Open Dialog</button>
      {api.isOpen && (
        <Portal>
          <div {...api.backdropProps} />
          <div {...api.containerProps}>
            <div {...api.contentProps}>
              <h2 {...api.titleProps}>Edit profile</h2>
              <p {...api.descriptionProps}>
                Make changes to your profile here. Click save when you are done.
              </p>
              <div>{props.children}</div>
              <button {...api.closeTriggerProps}>Close</button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

// import { ReactNode } from "react";
// import * as dialog from "@zag-js/dialog";
// import { useMachine, normalizeProps, Portal as ZagPortal } from "@zag-js/react";
// import { modalContainer, modalBackdrop, modalContent } from "./modal.css";

// export interface ModalProps {
//   defaultOpen?: boolean;
//   onClose?: () => void;
//   onOpen?: () => void;
//   id?: string;
//   backdropClassName?: string;
//   backdropProps?: any;
//   title?: ReactNode;
//   renderTrigger: (triggerProps: any) => ReactNode;
//   renderContent: ({ isOpen }: { isOpen: boolean }) => ReactNode;
// }

// export default function Modal(props: ModalProps) {
//   const [state, send] = useMachine(dialog.machine({ id: "1" }));

//   const api = dialog.connect(state, send, normalizeProps);

//   return (
//     <>
//       {props.renderTrigger(api.triggerProps)}
//       {api.isOpen && (
//         <ZagPortal>
//           <div>
//             <div {...api.backdropProps} class={modalBackdrop} />
//             <div {...api.containerProps} class={modalContainer}>
//               <div {...api.contentProps} class={modalContent}>
//                 <h2 {...api.titleProps}>Edit profile</h2>
//                 {props.renderContent({ isOpen: api.isOpen })}
//                 <button {...api.closeTriggerProps}>Close</button>
//               </div>
//             </div>
//           </div>
//         </ZagPortal>
//       )}
//     </>
//   );
// }
