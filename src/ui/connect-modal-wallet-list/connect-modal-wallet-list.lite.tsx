import {
  Show,
  useStore,
  onMount,
  onUnMount,
  onUpdate,
  useRef,
  For,
} from "@builder.io/mitosis";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import clx from "clsx";
import WalletButton from "../connect-modal-wallet-button";
import {
  walletList,
  squareWallets,
  listWallets,
  container,
} from "./connect-modal-wallet-list.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ConnectModalWalletListProps } from "./connect-modal-wallet-list.types";

export default function ConnectModalWalletList(
  props: ConnectModalWalletListProps
) {
  const measureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  let animationRef = useRef<AnimeInstance | null>(null);
  let cleanupRef = useRef<() => void>(null);

  const state = useStore({
    displayBlur: false,
    theme: "light",
    onWalletItemClickAsync: (exec) => {
      void (async function () {
        await exec();
      })();
    },
  });

  onMount(() => {
    state.theme = store.getState().theme;

    const unsubTheme = store.subscribe((newState) => {
      state.theme = newState.theme;
    });

    if (measureRef) {
      if (measureRef.clientHeight >= 320) {
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
        unsubTheme();
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
        height: [0, 36],
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
    <div className={clx(container, props.className)}>
      <div ref={measureRef} className={walletList}>
        <Show
          when={props.wallets
            .slice(0, 2)
            .every((wallet) => wallet.shape === "square")}
        >
          <div className={squareWallets}>
            {/* First 2 wallets are square */}
            <For each={props.wallets.slice(0, 2)}>
              {(wallet, index) => (
                <WalletButton
                  key={wallet.name}
                  variant="square"
                  name={wallet.prettyName ?? wallet.name}
                  logo={wallet.logo}
                  subLogo={wallet.subLogo}
                  onClick={state.onWalletItemClickAsync(async () =>
                    props.onWalletItemClick?.(wallet.originalWallet)
                  )}
                />
              )}
            </For>
          </div>
        </Show>

        <div className={listWallets}>
          <For each={props.wallets.filter((w) => w.shape === "list")}>
            {(wallet, index) => (
              <WalletButton
                key={wallet.name}
                variant="list"
                name={wallet.prettyName ?? wallet.name}
                logo={wallet.logo}
                subLogo={wallet.subLogo}
                onClick={state.onWalletItemClickAsync(async () =>
                  props.onWalletItemClick?.(wallet.originalWallet)
                )}
              />
            )}
          </For>
        </div>
      </div>

      <div ref={shadowRef} className={bottomShadow[state.theme]} />
    </div>
  );
}
