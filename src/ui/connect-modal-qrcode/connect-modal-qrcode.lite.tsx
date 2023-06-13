import {
  Show,
  useStore,
  onMount,
  onUnMount,
  onUpdate,
  useRef,
  useDefaultProps,
} from "@builder.io/mitosis";
import anime from "animejs";
import type { ConnectModalQRCodeProps } from "./connect-modal-qrcode.types";
import QRCodeSkeleton from "../connect-modal-qrcode-skeleton";
import Stack from "../stack";
import Text from "../text";
import QRCode from "../qrcode";
import QRCodeError from "../connect-modal-qrcode-error";
import {
  descriptionStyle,
  qrCodeContainer,
  qrCodeBgVar,
  qrCodeFgVar,
  qrCodeDesc,
  qrCodeDescContent,
  qrCodeDescShadow,
} from "./connect-modal-qrcode.css";
import type { AnimeInstance } from "animejs";

export default function ConnectModalQRCode(props: ConnectModalQRCodeProps) {
  useDefaultProps({
    qrCodeSize: 230,
  });

  const measureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  let animationRef = useRef<AnimeInstance | null>(null);
  let cleanupRef = useRef<() => void>(null);

  const state = useStore({
    displayBlur: false,
  });

  onMount(() => {
    if (measureRef) {
      if (measureRef.clientHeight >= 64) {
        state.displayBlur = true;
      } else {
        state.displayBlur = false;
      }

      const scrollHandler = () => {
        const height = Math.abs(
          measureRef.scrollHeight -
            measureRef.clientHeight -
            measureRef.scrollTop
        );
        if (height < 1) {
          state.displayBlur = false;
        } else {
          state.displayBlur = true;
        }
      };

      measureRef.addEventListener("scroll", scrollHandler);

      cleanupRef = () => {
        if (measureRef) {
          measureRef.removeEventListener("scroll", scrollHandler);
        }
      };
    }
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    if (!shadowRef) return;

    // Animation not init yet
    if (shadowRef && !animationRef) {
      animationRef = anime({
        targets: shadowRef,
        opacity: [0, 1],
        height: [0, 28],
        delay: 50,
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    }

    if (state.displayBlur) {
      animationRef?.restart();
    } else {
      animationRef?.reverse();
    }
  }, [state.displayBlur, shadowRef]);

  return (
    <Stack direction="column" space="4" align="center">
      <Text fontWeight="medium" size="md" className={descriptionStyle}>
        {props.description}
      </Text>

      <Show when={props.status === "Pending"}>
        <QRCodeSkeleton />
      </Show>

      <Show when={props.status === "Done"}>
        <div className={qrCodeContainer}>
          <QRCode
            value={props.link}
            size={props.qrCodeSize}
            bgColor={qrCodeBgVar}
            fgColor={qrCodeFgVar}
            level={"L"}
            includeMargin={false}
          />
        </div>
      </Show>

      <Show when={props.status === "Error" || props.status === "Expired"}>
        <QRCodeError
          onRefresh={() => props.onRefresh?.()}
          qrCodeSize={props.qrCodeSize}
        />
      </Show>

      <Show when={!!props.errorTitle}>
        <Show when={props.status === "Error"}>
          <Text
            as="p"
            fontWeight="medium"
            size="md"
            marginTop="2"
            color={{
              light: "red500",
              dark: "red400",
            }}
          >
            {props.errorTitle}
          </Text>

          <Show when={props.status === "Expired"}>
            <Text
              as="p"
              fontWeight="medium"
              size="md"
              marginTop="2"
              color={{
                light: "orange300",
                dark: "orange200",
              }}
            >
              {props.errorTitle}
            </Text>
          </Show>
        </Show>
      </Show>

      <Show when={!!props.errorDesc}>
        <div className={qrCodeDesc}>
          <div ref={measureRef} className={qrCodeDescContent}>
            <p>{props.errorDesc}</p>
          </div>

          <div ref={shadowRef} className={qrCodeDescShadow}></div>
        </div>
      </Show>
    </Stack>
  );
}
