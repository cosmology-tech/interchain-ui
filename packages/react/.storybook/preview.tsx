import React from "react";
import type { Preview } from "@storybook/react";
import WithThemeDecorator from "./WithThemeDecorator";
import { I18nProvider } from "../src";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story) => (
      <WithThemeDecorator>
        <I18nProvider locale="en-US" currency="USD" >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        {story()}
        </I18nProvider>
      </WithThemeDecorator>
    ),
  ],
};

export default preview;
