import { Color, converter, parse, formatRgb, formatHex } from "culori";

// A color with a Y value of 0.18 will have the particular quality of passing WCAG contrast level AA5 on both pure white ( #ffffff) and pure black ( #000000) backgrounds.
// which is a good test for dark/white backgrounds
const PASS_Y_LIGHT_THRES = 0.18;

// utility functions
const YtoL = (Y: number) => {
  if (Y <= 0.0088564516) {
    return Y * 903.2962962;
  } else {
    return 116 * Math.pow(Y, 1 / 3) - 16;
  }
};

const toe = (l: number) => {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);

  return (
    0.5 *
    (k_3 * l -
      k_1 +
      Math.sqrt((k_3 * l - k_1) * (k_3 * l - k_1) + 4 * k_2 * k_3 * l))
  );
};

const normalizeScaleNumber = (
  scaleNumber: number,
  minScale: number,
  maxScale: number,
) => {
  // Normalize the scale to a range between 0 and 1
  const normalized = (scaleNumber - minScale) / (maxScale - minScale);
  // Apply a power function to create more distinction between middle values
  return Math.pow(normalized, 1.5);
};

// hue, chroma, and lightness functions
const computeScaleHue = (scaleValue: number, baseHue: number) =>
  baseHue + 5 * (1 - scaleValue);

const computeScaleChroma = (
  scaleValue: number,
  minChroma: number,
  maxChroma: number,
) => {
  const chromaDifference = maxChroma - minChroma;
  let chroma =
    -4 * chromaDifference * Math.pow(scaleValue, 2) +
    4 * chromaDifference * scaleValue +
    minChroma;
  return Math.max(0, Math.min(1, chroma));
};

const computeScaleLightness = (scaleValue: number, backgroundY: number) => {
  // Adjust the scale value to avoid extremes
  const adjustedScaleValue = 0.05 + scaleValue * 0.9;

  let foregroundY: number;

  if (backgroundY > PASS_Y_LIGHT_THRES) {
    foregroundY =
      (backgroundY + 0.05) / Math.exp(2.75 * adjustedScaleValue) - 0.05;
  } else {
    foregroundY =
      Math.exp(2.75 * adjustedScaleValue) * (backgroundY + 0.05) - 0.05;
  }

  // Ensure the result is between 0.05 and 0.95
  const lightness = Math.max(
    0.05,
    Math.min(0.95, toe(YtoL(foregroundY)) / 100),
  );

  // Further adjust lightness to create more distinction between dark values
  return Math.pow(lightness, 1.2);
};

// Get background Y value in XYZ color space
const getBackgroundY = (backgroundColor: string) => {
  const xyzConverter = converter("xyz65");
  const xyzBg = xyzConverter(parse(backgroundColor));
  return xyzBg?.y ?? 0;
};

// color generator function
const computeColorAtScaleNumber = (
  scaleNumber: number,
  minScale: number,
  maxScale: number,
  baseHue: number,
  minChroma: number,
  maxChroma: number,
  backgroundColor: string,
) => {
  let rgbConverter = converter("rgb");

  // create an OKHsl color object; this might look different depending on what library you use
  let okhslColor: Color = {
    mode: "okhsl",
    h: 0,
    s: 0,
    l: 0,
  };
  // normalize scale number
  const scaleValue = normalizeScaleNumber(scaleNumber, minScale, maxScale);

  // Invert the scale value for lightness calculation
  const invertedScaleValue = 1 - scaleValue;

  // compute color values
  okhslColor.h = computeScaleHue(scaleValue, baseHue);
  okhslColor.s = computeScaleChroma(scaleValue, minChroma, maxChroma);
  okhslColor.l = computeScaleLightness(
    invertedScaleValue,
    getBackgroundY(backgroundColor),
  );

  // Convert OKHsl to RGB
  const rgbColor = rgbConverter(okhslColor);

  // Format RGB as a string, and then to hex
  return formatHex(formatRgb(rgbColor));
};

const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const minScale = scales[0];
const maxScale = scales[scales.length - 1];

const defaultBaseHues = {
  neutral: 250,
  blue: 250,
  green: 145,
  red: 20,
  yellow: 70,
} as const;

export type ThemePaletteScaleName = keyof typeof defaultBaseHues;

export type ThemePaletteScale = {
  name: string;
  colors: {
    [key in (typeof scales)[number]]: string;
  };
};

export type HuesConfig = {
  [key in ThemePaletteScaleName]: number;
};

export function paletteGenerator({
  hues,
  backgroundColor,
}: {
  hues?: HuesConfig;
  backgroundColor: string;
}) {
  const palettes = Object.entries(hues).map(([name, hue]) => {
    return {
      name,
      colors: scales.map((scale) => {
        if (name === "neutral") {
          let chromaRange = [0, 0.08];
          return computeColorAtScaleNumber(
            scale,
            minScale,
            maxScale,
            hue,
            chromaRange[0],
            chromaRange[1],
            backgroundColor,
          );
        }

        let chromaRange = [0.1, 0.8];
        return computeColorAtScaleNumber(
          scale,
          minScale,
          maxScale,
          hue,
          chromaRange[0],
          chromaRange[1],
          backgroundColor,
        );
      }),
    };
  });

  return palettes;
}
