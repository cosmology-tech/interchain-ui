import { ListItemSize } from "./list-item.types";
import { createVar } from "@vanilla-extract/css";
import { StringifyValues } from "../../helpers/types";

export type ListItemIntent = "none";

export const listItemVarPrefix = "ListItem" as const;
export const listItemIntents: ListItemIntent[] = ["none"] as const;
export const listItemSizes: ListItemSize[] = ["sm", "md"] as const;
const listItemStates = [
  "default",
  "hovered",
  "active",
  "selected",
  "disabled",
] as const;

export type ListItemState = (typeof listItemStates)[number];

const intentProps = {
  // Default
  textColor: "",
  bgColor: "",
  borderRadius: "",
  // Hover
  hoverTextColor: "",
  hoverBgColor: "",
  hoverBorderRadius: "",
  // Active
  activeTextColor: "",
  activeBgColor: "",
  activeBorderRadius: "",
  // Selected
  selectedTextColor: "",
  selectedBgColor: "",
  selectedBorderRadius: "",
  // Disabled
  disabledTextColor: "",
  disabledBgColor: "",
  disabledBorderRadius: "",
  disabledOpacity: "",
} as const;

const sizeProps = {
  fontSize: "",
  fontWeight: "",
  paddingX: "",
  paddingY: "",
  height: "",
  minWidth: "",
} as const;

export type ListItemSizeProperties = StringifyValues<typeof sizeProps>;
export type ListItemIntentProperties = StringifyValues<typeof intentProps>;
export type ListItemSizeProperty = keyof ListItemSizeProperties;
export type ListItemIntentProperty = keyof ListItemIntentProperties;

export type ListItemSizeScheme = Partial<
  Record<ListItemSize, Partial<ListItemSizeProperties>>
>;
export type ListItemIntentScheme = Partial<
  Record<ListItemIntent, Partial<ListItemIntentProperties>>
>;

export type ListItemVarKeys =
  | `${typeof listItemVarPrefix}-${ListItemSize}-${ListItemSizeProperty}`
  | `${typeof listItemVarPrefix}-${ListItemIntent}-${ListItemIntentProperty}`;

export type ListItemVars = {
  [K in ListItemVarKeys]: string;
};

export function generateListItemVars() {
  const vars = {} as ListItemVars;

  listItemSizes.forEach((size) => {
    Object.keys(sizeProps).forEach((prop) => {
      const key =
        `${listItemVarPrefix}-${size}-${prop as ListItemSizeProperty}` satisfies ListItemVarKeys;
      vars[key] = createVar();
    });
  });

  listItemIntents.forEach((intent) => {
    Object.keys(intentProps).forEach((prop) => {
      const intentKey =
        `${listItemVarPrefix}-${intent}-${prop as ListItemIntentProperty}` satisfies ListItemVarKeys;
      vars[intentKey] = createVar();
    });
  });

  return vars;
}
