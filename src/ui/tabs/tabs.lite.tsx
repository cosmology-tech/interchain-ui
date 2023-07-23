import {
  Show,
  For,
  useDefaultProps,
  useStore,
  onUpdate,
  useRef,
} from "@builder.io/mitosis";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import * as styles from "./tabs.css";
import { TabProps, TabsProps } from "./tabs.types";

export default function Tabs(props: TabsProps) {
  const state = useStore<{
    selected: number;
    selectTab: (index: number) => void;
    Panel: TabProps;
    getPanel: () => any;
  }>({
    selected: 0,
    Panel: null,
    selectTab(index) {
      state.selected = index;
    },
    getPanel() {
      if (state.Panel) {
        const Comp = state.Panel.Component;
        return <Comp />;
      } else {
        return null;
      }
    },
  });

  onUpdate(() => {
    const panel: boolean | TabProps =
      props?.tabs && props?.tabs.find((_, index) => index === state.selected);
    state.Panel = panel;
  }, [props?.tabs, state.selected]);
  return (
    <Box>
      <Box
        className={clsx(styles.tabsHorizontal)}
        as="ul"
        position="relative"
        m="0"
        p="0"
        marginBottom="10"
        backgroundColor="progressBg"
        attributes={{
          role: "tablist",
        }}
      >
        <For each={props?.tabs}>
          {(tab: TabProps, index: number) => (
            <Box
              as="li"
              flex={1}
              className="nav-item"
              attributes={{
                role: "tab",
                id: `btn-${index}`,
                "aria-selected": state.selected === index,
                "aria-controls": `tabpanel-${index}`,
              }}
              key={tab.label}
            >
              <Box
                as="button"
                className={styles.baseBtn}
                attributes={{
                  onClick: () => state.selectTab(index),
                }}
              >
                <Text
                  color="textSecondary"
                  weight="semibold"
                  className={clsx(styles.baseText, {
                    [styles.selectedText]: state.selected === index,
                    [styles.selected]: state.selected === index,
                  })}
                  attributes={{
                    px: "14",
                    py: "7",
                  }}
                >
                  {tab.label}
                </Text>
              </Box>
            </Box>
          )}
        </For>
        <Box
          className={styles.selectedBg}
          position="absolute"
          height="full"
          backgroundColor="text"
          attributes={{
            style: assignInlineVars({
              [styles.selectedWidth]: `calc(100% / ${props?.tabs.length})`,
              [styles.selectedLeft]: `calc(100% / ${props?.tabs.length} * ${state.selected})`,
            }),
          }}
        ></Box>
      </Box>

      <Box className="tab-content">
        <Box
          attributes={{
            role: "tabpanel",
            "aria-labelledby": `btn-${state.selected}`,
            id: `tabpanel-${state.selected}`,
          }}
        >
          {state.getPanel()}
        </Box>
      </Box>
    </Box>
  );
}
