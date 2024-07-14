/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "showroom/**/*.show.{js,jsx,ts,tsx,mdx}",
  addons: {
    a11y: {
      enabled: true,
    },
    action: {
      enabled: true,
      defaultState: [],
    },
    control: {
      enabled: true,
      defaultState: {},
    },
    ladle: {
      enabled: true,
    },
    mode: {
      enabled: true,
      defaultState: "full",
    },
    msw: {
      enabled: false,
    },
    rtl: {
      enabled: true,
      defaultState: false,
    },
    source: {
      enabled: true,
      defaultState: false,
    },
    theme: {
      enabled: true,
      defaultState: "light",
    },
    width: {
      enabled: true,
      options: {
        mobile: 414,
        tablet: 640,
        desktop: 768,
        desktopMd: 1024,
      },
      defaultState: 0,
    },
  },
};
