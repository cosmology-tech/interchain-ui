import { generateButtonVars } from "../../ui/button/button.vars.css";
import { generateTabsVars } from "../../ui/tabs/tabs.vars.css";
import { generateTextFieldVars } from "../../ui/text-field/text-field.vars.css";
import { generateSelectButtonVars } from "../../ui/select-button/select-button.vars.css";
import { generateListItemVars } from "../../ui/list-item/list-item.vars.css";
import { generateTooltipVars } from "../../ui/tooltip/tooltip.vars.css";

export const slotVars = {
  ...generateButtonVars(),
  ...generateTabsVars(),
  ...generateTextFieldVars(),
  ...generateSelectButtonVars(),
  ...generateListItemVars(),
  ...generateTooltipVars(),
} as const;
