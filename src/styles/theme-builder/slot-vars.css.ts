import { generateButtonVars } from "../../ui/button/button.vars.css";
import { generateTabsVars } from "../../ui/tabs/tabs.vars.css";

export const slotVars = {
  ...generateButtonVars(),
  ...generateTabsVars(),
} as const;
