/**
 * Adapted from package qrcode.react to work with Lite JSX
 * https://github.com/zpao/qrcode.react
 */
import {
  useStore,
  onUpdate,
  onMount,
  useDefaultProps,
  Show,
  useMetadata,
} from "@builder.io/mitosis";
import qrcodegen from "./qrcodegen/qrcodegen";
import {
  DEFAULT_SIZE,
  DEFAULT_LEVEL,
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_INCLUDEMARGIN,
  ERROR_LEVEL_MAP,
} from "./qrcode.types";
import type { QRProps } from "./qrcode.types";
import {
  excavateModules,
  generatePath,
  getImageSettings,
  getMarginSize,
} from "./qrcode.helpers";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function QRCode(props: QRProps) {
  useDefaultProps({
    size: DEFAULT_SIZE,
    level: DEFAULT_LEVEL,
    bgColor: DEFAULT_BGCOLOR,
    fgColor: DEFAULT_FGCOLOR,
    includeMargin: DEFAULT_INCLUDEMARGIN,
  });

  const state = useStore({
    available: false,
    cells: null,
    calculatedImageSettings: null,
    margin: null,
    fgPath: null,
    generateNewPath(newMargin: number) {
      // Drawing strategy: instead of a rect per module, we're going to create a
      // single path for the dark modules and layer that on top of a light rect,
      // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
      // way faster than DOM ops.
      // For level 1, 441 nodes -> 2
      // For level 40, 31329 -> 2
      return generatePath(state.cells ?? [], newMargin);
    },
    genCells() {
      return qrcodegen.QrCode.encodeText(
        props.value,
        ERROR_LEVEL_MAP[props.level],
      ).getModules();
    },
    numCells() {
      return (state.cells?.length ?? 0) + (state.margin ?? 0) * 2;
    },
  });

  onMount(() => {
    state.cells = state.genCells();
  });

  onUpdate(() => {
    if (props.imageSettings != null && state.calculatedImageSettings != null) {
      if (state.calculatedImageSettings.excavation != null) {
        state.cells = excavateModules(
          state.cells,
          state.calculatedImageSettings.excavation,
        );
      }

      if (!state.available) {
        state.available = true;
      }
    }
  }, [props.imageSettings, state.calculatedImageSettings]);

  onUpdate(() => {
    const newMargin = getMarginSize(props.includeMargin, props.marginSize);

    state.margin = newMargin;

    state.calculatedImageSettings = getImageSettings(
      state.cells,
      props.size,
      newMargin,
      props.imageSettings,
    );

    state.fgPath = state.generateNewPath(newMargin);
  }, [
    props.size,
    props.imageSettings,
    props.includeMargin,
    props.marginSize,
    state.cells,
  ]);

  return (
    <svg
      height={props.size}
      width={props.size}
      viewBox={`0 0 ${state.numCells()} ${state.numCells()}`}
      className={props.className}
    >
      <Show when={!!props.title}>
        <title>{props.title}</title>
      </Show>

      <path
        fill={props.bgColor}
        d={`M0,0 h${state.numCells()}v${state.numCells()}H0z`}
        shape-rendering="crispEdges"
      />
      <path
        fill={props.fgColor}
        d={state.fgPath}
        shape-rendering="crispEdges"
      />

      <Show when={state.available && !!props.imageSettings?.src}>
        <image
          href={props.imageSettings.src}
          height={state.calculatedImageSettings.h}
          width={state.calculatedImageSettings.w}
          x={state.calculatedImageSettings.x + state.margin}
          y={state.calculatedImageSettings.y + state.margin}
          preserveAspectRatio="none"
        />
      </Show>
    </svg>
  );
}
