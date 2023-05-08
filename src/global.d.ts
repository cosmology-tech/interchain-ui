// Workaround for importing svg
declare module "*.svg" {
  const content: string;
  export default content;
}
