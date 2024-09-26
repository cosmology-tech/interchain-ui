import * as React from "react";
import { Pane } from "tweakpane";
import { ThemeVariant } from "../src";
import { slotVars } from "../src/styles/theme-builder/slot-vars.css";

type ConfigComponent =
  | "Button"
  | "TextField"
  | "NumberField"
  | "Tabs"
  | "ListItem"
  | "Tooltip"
  | "KitchenSink";

interface Params {
  [key: string]: string;
}

export type ConfigChangeEvent = {
  [key in ThemeVariant]: {
    varKey: string;
    varValue: string;
  };
};

export interface ConfigPaneProps {
  component?: ConfigComponent;
  onConfigChange?: (event: ConfigChangeEvent) => void;
}

const filterVars = (varPrefix: string) => {
  return Object.keys(slotVars).filter((key) => key.startsWith(varPrefix));
};

const isColorProperty = (key: string) => {
  return key.includes("color") || key.includes("Color");
};

const isDimensionProperty = (key: string) => {
  const lowercaseKey = key.toLowerCase();
  return (
    lowercaseKey.includes("width") ||
    lowercaseKey.includes("height") ||
    lowercaseKey.includes("padding")
  );
};

export const ConfigPane = (props: ConfigPaneProps) => {
  React.useEffect(() => {
    const container = document.getElementById("config-pane-container");

    if (!container || !props.component) {
      return;
    }

    const pane = new Pane({
      container: container!,
      title: `${props.component} Config`,
    });

    const tab = pane.addTab({
      pages: [{ title: "Light" }, { title: "Dark" }],
    });

    const componentVars = filterVars(props.component);

    const params: Params = componentVars.reduce((acc, key) => {
      if (isColorProperty(key)) {
        acc[key] = "#ffffff";
      } else if (isDimensionProperty(key)) {
        acc[key] = "0px";
      } else {
        acc[key] = "";
      }

      return acc;
    }, {});

    for (const varKey in params) {
      tab.pages[0].addBinding(params, varKey);
      tab.pages[1].addBinding(params, varKey);
    }

    pane.on("change", (ev) => {
      const state = pane.exportState();
      // @ts-ignore
      const [lightTheme, darkTheme] = state.children[0].children;
      // @ts-ignore
      const varKey = ev.target.key;
      const varValue = ev.value;

      console.log("DEBUG", { state, ev });

      const bindingInLight = lightTheme.children.find(
        (item) => item.binding.key === varKey,
      );
      const bindingInDark = darkTheme.children.find(
        (item) => item.binding.key === varKey,
      );

      const event: ConfigChangeEvent = {
        light: {
          varKey,
          varValue: bindingInLight.binding?.value,
        },
        dark: {
          varKey,
          varValue: bindingInDark.binding?.value,
        },
      };

      // console.log({
      //   state,
      //   bindingInLight,
      //   bindingInDark,
      //   lightTheme,
      //   darkTheme,
      //   event,
      // });

      props.onConfigChange?.(event);
    });

    return () => {
      pane.dispose();
    };
  }, [props.component]);

  return null;
};
