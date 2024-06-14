import * as React from "react";
import type { Story, StoryDefault } from "@ladle/react";
import Button from "../../src/ui/button";
import type { ButtonProps } from "../../src/ui/button/button.types";

export default {
  title: "Button",
  meta: {},
} satisfies StoryDefault;

export const PrimaryButton: Story<{
  onClick: () => void;
}> = ({ onClick }) => <Button onClick={onClick}>My Button</Button>;

PrimaryButton.argTypes = {
  onClick: {
    action: "clicked",
  },
};

// ==============================
export const SecondaryButton: Story<{
  onClick: () => void;
}> = ({ onClick }) => (
  <Button intent="secondary" onClick={onClick}>
    My Button
  </Button>
);

SecondaryButton.argTypes = {
  onClick: {
    action: "clicked",
  },
};

// ==============================
export const TertiaryButton: Story<{
  onClick: () => void;
}> = ({ onClick }) => (
  <Button intent="tertiary" onClick={onClick}>
    My Button
  </Button>
);

TertiaryButton.argTypes = {
  onClick: {
    action: "clicked",
  },
};

// ==============================
export const ButtonWithIntent: Story<{
  intent: ButtonProps["intent"];
  onClick: () => void;
}> = ({ intent, onClick }) => (
  <Button intent={intent} onClick={onClick}>
    My Button
  </Button>
);

ButtonWithIntent.argTypes = {
  onClick: {
    action: "clicked",
  },
  intent: {
    options: ["success", "warning", "danger"],
    control: {
      type: "select",
    },
    defaultValue: "success",
  },
};

// ==============================
export const ButtonSizes: Story<{
  size: ButtonProps["size"];
  variant: ButtonProps["variant"];
  intent: ButtonProps["intent"];
  onClick: () => void;
}> = ({ size, variant, intent, onClick }) => (
  <Button size={size} onClick={onClick} variant={variant} intent={intent}>
    My Button
  </Button>
);

ButtonSizes.argTypes = {
  onClick: {
    action: "clicked",
  },
  size: {
    options: ["xs", "sm", "md", "lg"] satisfies Array<ButtonProps["size"]>,
    control: {
      type: "select",
    },
    defaultValue: "sm",
  },
  variant: {
    options: ["solid", "outlined", "link", "ghost", "unstyled"] satisfies Array<
      ButtonProps["variant"]
    >,
    control: {
      type: "select",
    },
    defaultValue: "solid",
  },
  intent: {
    options: [
      "primary",
      "secondary",
      "tertiary",
      "text",
      "warning",
      "success",
      "danger",
    ] satisfies Array<ButtonProps["intent"]>,
    control: {
      type: "select",
    },
    defaultValue: "primary",
  },
};
