import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Text from "../src/ui/text";
import Icon from "../src/ui/icon";
import { ALL_ICON_NAMES } from "../src/ui/icon/icon.types";

export const AllIcons: Story = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "min-content",
        gridAutoFlow: "row dense",
        gridAutoColumns: "minmax(0, 1fr)",
        gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
        rowGap: "40px",
      }}
    >
      {ALL_ICON_NAMES.map((iconName) => (
        <Box
          display="inline-flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="200px"
          color="$text"
        >
          <Icon name={iconName} />
          <Text
            attributes={{
              mt: "$4",
              display: "inline-block",
            }}
          >
            {iconName}
          </Text>
        </Box>
      ))}
    </div>
  );
};
