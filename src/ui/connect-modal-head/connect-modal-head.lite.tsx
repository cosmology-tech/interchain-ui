import { Show, useDefaultProps } from "@builder.io/mitosis";
import clx from "clsx";
import Button from "../button";
import { sprinkles as s } from "../../styles/sprinkles.css";
import * as styles from "./connect-modal-head.css";
import type { ConnectModalHeadProps } from "./connect-modal-head.types";

export default function ConnectModalHead(props: ConnectModalHeadProps) {
  useDefaultProps({
    hasBackButton: false,
    hasCloseButton: true,
  });

  return (
    <div className={clx(styles.modalHeader, props.className)}>
      <Show when={props.hasBackButton}>
        <div className={clx(styles.modalBackButton)}>
          <Button
            rightIcon="arrowLeftSLine"
            intent="secondary"
            variant="ghost"
            size="sm"
            iconSize="xl"
            className={s({ p: "0" })}
            onClick={(e) => props.onBack?.(e)}
          />
        </div>
      </Show>

      <p className={styles.modalHeaderText} {...props.titleProps}>
        {props.title}
      </p>

      <Show when={props.hasCloseButton}>
        <div className={clx(styles.modalCloseButton)}>
          <Button
            rightIcon="closeFilled"
            intent="secondary"
            variant="ghost"
            size="sm"
            iconSize="xl"
            className={s({ p: "0" })}
            onClick={(e) => props.closeButtonProps?.onClick?.(e)}
            attributes={props.closeButtonProps}
          />
        </div>
      </Show>
    </div>
  );
}
