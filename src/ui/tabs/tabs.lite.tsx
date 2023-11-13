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
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import Box from "../box";
import Text from "../text";
import { store } from "../../models/store";
import { standardTransitionProperties, scrollBar } from "../shared/shared.css";
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
    getBgColor: () => Sprinkles["backgroundColor"];
    getTextColor: (tabIndex: number) => Sprinkles["color"];
    // Active state styles
    width: number;
    transform: string;
    setActiveStyles: (activeTab: number) => void;
  }>({
    isMounted: false,
    theme: "light",
    active: 0,
    width: 0,
    transform: "translateX(0)",
    findActiveTabContent() {
      const panel: TabProps | null = props?.tabs
        ? props?.tabs.find((_, index) => index === state.active) ?? null
        : null;
      return panel?.content ?? null;
    },
    getBgColor() {
      return state.theme === "light" ? "$gray200" : "$gray800";
    },
    getTextColor(tabIndex: number) {
      if (tabIndex !== state.active) {
        return "$textSecondary";
      }
      return state.theme === "light" ? "$white" : "$gray900";
    },
    setActiveStyles(activeTab: number) {
      if (!tabListRef) return;

      const nextTab = tabListRef.querySelector(
        `[role="tab"][data-tab-key="tab-${activeTab}"]`
      ) as HTMLElement;

      state.width = nextTab?.offsetWidth ?? 0;
      state.transform = `translateX(${nextTab?.offsetLeft}px)`;
    },
  });
  let cleanupRef = useRef<() => void>(null);
  let activeTabContentRef = useRef(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.isMounted = true;

    setTimeout(() => {
      state.setActiveStyles(props.defaultActiveTab ?? state.active);
    }, 100);

    const handleResize = () => {
      state.setActiveStyles(state.active);
    };

    window.addEventListener("resize", handleResize, true);

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
      window.removeEventListener("resize", handleResize);
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  onUpdate(() => {
    activeTabContentRef = state.findActiveTabContent();
  }, [state.active]);

  return (
    <Box className={props.className} {...props.attributes}>
      <Box
        className={clsx(styles.tabsHorizontal, scrollBar[state.theme])}
        bg={state.getBgColor()}
        as="ul"
        position="relative"
        m="$0"
        p="$0"
        zIndex={0}
        minWidth={{
          mobile: "350px",
          tablet: "465px",
          desktop: "465px",
        }}
        maxWidth={{
          mobile: "350px",
          tablet: "unset",
          desktop: "unset",
        }}
        backgroundColor="$progressBg"
        ref={tabListRef}
        attributes={{
          role: "tablist",
        }}
      >
        {/* Tab selection background */}
        <Box
          className={styles.tabSelection}
          backgroundColor={state.theme === "light" ? "$accentText" : "#F5F7FB"}
          width={`${state.width}px`}
          transform={state.transform}
          attributes={{
            "data-part-id": "tab-selection",
          }}
        />

        <For each={props?.tabs}>
          {(tab: TabProps, index: number) => (
            <Box
              as="li"
              flex={1}
              className="tab-item"
              attributes={{
                role: "tab",
                "data-tab-key": `tab-${index}`,
                "aria-selected": state.active === index,
                "aria-controls": `tabpanel-${index}`,
              }}
              key={tab.label}
            >
              <Box
                as="button"
                className={styles.tabButton}
                attributes={{
                  onClick: () => {
                    state.active = index;
                    state.setActiveStyles(index);
                  },
                }}
              >
                <Text
                  fontSize={{
                    mobile: "$xs",
                    tablet: "$sm",
                    desktop: "$sm",
                  }}
                  color={state.getTextColor(index)}
                  fontWeight="$semibold"
                  className={clsx(standardTransitionProperties)}
                  attributes={{
                    px: {
                      mobile: "$6",
                      tablet: "$14",
                      desktop: "$14",
                    },
                    py: {
                      mobile: "$4",
                      tablet: "$7",
                      desktop: "$7",
                    },
                    borderRadius: "50px",
                    zIndex: state.active === index ? -1 : undefined,
                  }}
                >
                  {tab.label}
                </Text>
              </Box>
            </Box>
          )}
        </For>
      </Box>

      <Box className="tab-content">
        <Box
          attributes={{
            role: "tabpanel",
            "aria-labelledby": `btn-${state.active}`,
            "data-tab-panel-key": `tabpanel-${state.active}`,
          }}
        >
          <Show when={state.isMounted}>{activeTabContentRef}</Show>
          <Show when={!state.isMounted}>{state.findActiveTabContent()}</Show>
        </Box>
      </Box>
    </Box>
  );
}
