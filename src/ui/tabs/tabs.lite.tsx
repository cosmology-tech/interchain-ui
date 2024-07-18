import {
  For,
  Show,
  useMetadata,
  useStore,
  useRef,
  onUpdate,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import clsx from "clsx";
import Box from "../box";
import { store } from "../../models/store";
import {
  standardTransitionProperties,
  scrollBar,
  visuallyHidden,
} from "../shared/shared.css";
import * as styles from "./tabs.css";

import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { ThemeVariant } from "../../models/system.model";
import type { TabProps, TabsProps } from "./tabs.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Tabs(props: TabsProps) {
  let tabListRef = useRef<HTMLUListElement | null>(null);

  const state = useStore<{
    isMounted: boolean;
    theme: ThemeVariant;
    active: number;
    findActiveTabContent: () => any;
    getTabContentFor: (id: number) => any;
    getBgColor: () => Sprinkles["backgroundColor"];
    getTextColor: (tabIndex: number) => Sprinkles["color"];
    // Active state styles
    width: number;
    transform: string;
    setActiveStyles: (activeTab: number) => void;
    isControlled: () => boolean;
    getActiveTabId: () => number;
  }>({
    isMounted: false,
    theme: "light",
    active: 0,
    width: 0,
    transform: "translateX(0)",
    isControlled() {
      return typeof props.activeTab !== "undefined";
    },
    getActiveTabId() {
      return state.isControlled() ? props.activeTab : state.active;
    },
    findActiveTabContent() {
      const finalActiveTab = state.getActiveTabId();

      const panel: TabProps | null = props?.tabs
        ? props?.tabs.find((_, index) => index === finalActiveTab) ?? null
        : null;
      return panel?.content ?? null;
    },
    getTabContentFor(id: number) {
      const panel: TabProps | null = props?.tabs
        ? props?.tabs.find((_, index) => index === id) ?? null
        : null;
      return panel?.content ?? null;
    },
    getBgColor() {
      return state.theme === "light" ? "$gray200" : "$gray800";
    },
    getTextColor(tabIndex: number) {
      const finalActiveTab = state.getActiveTabId();

      if (tabIndex !== finalActiveTab) {
        return "$textSecondary";
      }
      return state.theme === "light" ? "$white" : "$gray900";
    },
    setActiveStyles(activeTab: number) {
      if (!tabListRef) return;

      const nextTab = tabListRef.querySelector(
        `[role="tab"][data-tab-key="tab-${activeTab}"]`,
      ) as HTMLElement;

      state.width = nextTab?.offsetWidth ?? 0;
      state.transform = `translateX(${nextTab?.offsetLeft}px)`;
    },
  });
  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.isMounted = true;

    setTimeout(() => {
      const finalActiveTab = state.getActiveTabId();
      state.setActiveStyles(props.defaultActiveTab ?? finalActiveTab);
    }, 100);

    const handleResize = () => {
      const finalActiveTab = state.getActiveTabId();
      state.setActiveStyles(finalActiveTab);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      handleResize();
    });

    window.addEventListener("resize", handleResize, true);
    resizeObserver.observe(tabListRef);

    const cleanupStore = store.subscribe((newState) => {
      state.theme = newState.theme;
    });

    const cleanupListeners = () => {
      if (tabListRef && resizeObserver) {
        resizeObserver.unobserve(tabListRef);
      }
      window.removeEventListener("resize", handleResize);
    };

    cleanupRef = () => {
      cleanupStore();
      cleanupListeners();
    };
  });

  onUpdate(() => {
    // Only apply this effect for controlled component
    if (!state.isControlled()) return;
    state.setActiveStyles(props.activeTab);
  }, [props.activeTab]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  return (
    <Box className={props.className} {...props.attributes}>
      <Box
        className={clsx(
          props.variant === "pill"
            ? styles.tabsPill({
                size: props.size,
                theme: state.theme,
              })
            : styles.tabsLine({
                size: props.size,
                theme: state.theme,
              }),
          scrollBar[state.theme],
        )}
        as="ul"
        position="relative"
        m="$0"
        p="$0"
        zIndex={0}
        boxRef={tabListRef}
        attributes={{
          role: "tablist",
        }}
      >
        {/* Tab selection background - pill variant */}

        <Show when={props.variant === "pill"}>
          <Box
            className={styles.tabSelection}
            width={`${state.width}px`}
            transform={state.transform}
            attributes={{
              "data-part-id": "tab-selection",
            }}
          />
        </Show>

        <For each={props?.tabs}>
          {(tab: TabProps, index: number) => (
            <Box
              as="li"
              flex={props.variant === "pill" ? 1 : "0 0 auto"}
              width="auto"
              className="tab-item"
              attributes={{
                role: "tab",
                "data-tab-key": `tab-${index}`,
                "aria-selected": state.getActiveTabId() === index,
                "aria-controls": `tabpanel-${index}`,
              }}
              key={tab.label}
            >
              <Box
                as="button"
                className={clsx(
                  props.variant === "pill"
                    ? styles.tabButtonPill
                    : styles.tabButtonLine,
                )}
                attributes={{
                  "data-active": state.getActiveTabId() === index,
                  onClick: () => {
                    if (!state.isControlled()) {
                      state.active = index;
                    }
                    state.setActiveStyles(index);
                    props.onActiveTabChange?.(index);
                  },
                }}
              >
                <span
                  className={styles.tabButtonContent}
                  style={{
                    zIndex: state.getActiveTabId() === index ? "-1" : undefined,
                  }}
                >
                  {tab.label}
                </span>
              </Box>
            </Box>
          )}
        </For>
      </Box>

      <Box className="tab-content">
        <Box
          attributes={{
            role: "tabpanel",
            "aria-labelledby": `btn-${state.getActiveTabId()}`,
            "data-tab-panel-key": `tabpanel-${state.getActiveTabId()}`,
          }}
        >
          <Show when={props.isLazy}>{state.findActiveTabContent()}</Show>
          <Show when={!props.isLazy}>
            <For each={props.tabs}>
              {(_tabItem, index) => (
                <Box
                  key={index}
                  opacity={state.getActiveTabId() === index ? 1 : 0}
                  transition={standardTransitionProperties}
                  className={
                    state.getActiveTabId() === index ? "" : visuallyHidden
                  }
                >
                  {state.getTabContentFor(index)}
                </Box>
              )}
            </For>
          </Show>
        </Box>
      </Box>
    </Box>
  );
}
