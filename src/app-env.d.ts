// Workaround for importing images
declare module "*.svg" {
  const svgContent: string;
  export default svgContent;
}

declare module "*.png" {
  const pngContent: string;
  export default pngContent;
}
