import React from "react";
import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import WithThemeDecorator from "./WithThemeDecorator";
import { I18nProvider } from "../src";
import "./story-global.css";

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },

  decorators: [
    (story) => (
      <WithThemeDecorator>
        <I18nProvider locale="en-US" currency="USD">
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          {story()}
        </I18nProvider>
      </WithThemeDecorator>
    ),
  ],

  tags: ["autodocs"]
};

export default preview;
