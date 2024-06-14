/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "showcases/**/*.showcase.{js,jsx,ts,tsx,mdx}",
  addons: {
    width: {
      options: {
        phone: 380,
        tablet: 720,
        large: 1200,
      },
      enabled: true, // the addon can be disabled
      defaultState: 0, // default width in pixels (0 = no viewport is set)
    },
  },
};
