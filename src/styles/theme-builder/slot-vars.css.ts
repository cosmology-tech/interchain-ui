import { generateButtonVars } from "../../ui/button/button.vars.css";
import { generateTabsVars } from "../../ui/tabs/tabs.vars.css";
import { generateTextFieldVars } from "../../ui/text-field/text-field.vars.css";
import { generateSelectButtonVars } from "../../ui/select-button/select-button.vars.css";

export const slotVars = {
  ...generateButtonVars(),
  ...generateTabsVars(),
  ...generateTextFieldVars(),
  ...generateSelectButtonVars(),
} as const;
