import React from "react";
import type { Preview } from "@storybook/react";
import WithThemeDecorator from "./WithThemeDecorator";

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
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        {story()}
      </WithThemeDecorator>
    ),
  ],
};

export default preview;
