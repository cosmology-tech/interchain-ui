import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { Resolve } from "../../helpers/types";

type StyleProps = Resolve<Sprinkles>;

export type DividerProps = Partial<Pick<StyleProps, "mb" | "mt" | "width">>;
