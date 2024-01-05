import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Stack from "../src/ui/stack";
import Button from "../src/ui/button";
import Toast from "../src/ui/toast";
import Toaster from "../src/ui/toast/toaster";
import { toast } from "../src/ui/toast/toast.state";
import { ToastType } from "../src/ui/toast/toast.types";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Toast",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

// const Pre = ({ children }) => (
//   <Box
//     as="pre"
//     minWidth="200px"
//     color="$text"
//     padding="$4"
//     display="flex"
//     justifyContent="center"
//     borderColor="$gray600"
//     borderStyle="dashed"
//     borderWidth="1px"
//     borderRadius="$md"
//   >
//     {children}
//   </Box>
// );

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [showAutoClose, setShowAutoClose] = React.useState(false);
    const [showDismiss, setShowDismiss] = React.useState(false);
    const [isFinally, setIsFinally] = React.useState(false);
    const [customType, setCustomType] = React.useState<ToastType>("default");

    return (
      <Stack direction="vertical" space="$6">
        <Stack space="$6">
          <Button
            intent="secondary"
            data-testid="default-button"
            onClick={() => toast("My Toast")}
          >
            Render Toast
          </Button>
        </Stack>

        <Stack space="$6">
          <Button
            intent="secondary"
            data-testid="default-button-top"
            onClick={() =>
              toast.message("My Toast", {
                description: "Hello this is description",
              })
            }
          >
            Render Toast With Description
          </Button>
        </Stack>

        <div>
          <Button
            intent="secondary"
            data-testid="success"
            onClick={() => toast.success("My Success Toast")}
          >
            Render Success Toast
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            data-testid="error"
            onClick={() => toast.error("My Error Toast")}
          >
            Render Error Toast
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            data-testid="action"
            onClick={() =>
              toast("My Message", {
                action: {
                  label: "Action",
                  onClick: () => console.log("Action"),
                },
              })
            }
          >
            Render Action Toast
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            data-testid="action-prevent"
            onClick={() =>
              toast("My Message", {
                action: {
                  label: "Action",
                  onClick: (event) => {
                    event.preventDefault();
                    console.log("Action");
                  },
                },
              })
            }
          >
            Render Action Toast With pass through event
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            onClick={() =>
              toast.promise(promise, {
                loading: "Loading promise...",
                success: "Loaded promise",
                error: "Error promise",
              })
            }
          >
            Render Promise Toast
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            onClick={() =>
              toast.promise(promise, {
                loading: "Loading promise...",
                success: () => {
                  // Return a promise transition frame
                  return {
                    message:
                      "Loaded promise but some error from external service",
                    toastType: "error",
                  };
                },
                error: "Error promise",
              })
            }
          >
            Render Promise Toast with transition frame after success
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            onClick={() => toast("My Toast", { duration: Infinity })}
          >
            Render Infinity Toast
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            onClick={() =>
              toast("My Toast", {
                onAutoClose: () => setShowAutoClose(true),
              })
            }
          >
            Render Toast With onAutoClose callback
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            onClick={() =>
              toast("My Toast", {
                onDismiss: () => setShowDismiss(true),
              })
            }
          >
            Render Toast With onAutoClose callback
          </Button>
        </div>

        <div>
          <Button
            intent="secondary"
            onClick={() => {
              toast.custom(customType, "Complex toast");

              setTimeout(() => {
                setCustomType("success");
              }, 1000);
            }}
          >
            Complex
          </Button>
        </div>

        <Toaster position={"top-right"} closeButton={true} />
      </Stack>
    );
  },
};
