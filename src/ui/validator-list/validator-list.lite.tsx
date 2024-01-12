import { For, Show, useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import type { ValidatorListProps } from "./validator-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<ValidatorListProps>>({
  variant: "solid",
  gridLayout: "auto",
  columns: [],
  data: [],
});

export default function ValidatorList(props: ValidatorListProps) {
  return (
    <Box
      overflowX={{
        mobile: "scroll",
        tablet: "auto",
        desktop: "auto",
      }}
      className={props.className}
    >
      <Box
        as="table"
        padding={props.variant === "solid" ? "$10" : "$0"}
        backgroundColor={props.variant === "solid" ? "$cardBg" : "$transparent"}
        borderRadius="$lg"
        tableLayout={props.gridLayout === "auto" ? "auto" : "fixed"}
        {...props.tableProps}
      >
        <Box as="thead">
          <Box as="tr">
            <For each={props.columns}>
              {(column) => (
                <Box
                  as="th"
                  key={column.id}
                  paddingX="$2"
                  paddingY="$5"
                  width={column.width}
                  textAlign={column.align}
                >
                  <Text
                    color={column.color ?? "$textSecondary"}
                    textTransform={column.textTransform}
                    fontWeight="$normal"
                    fontSize="$sm"
                  >
                    {column.label}
                  </Text>
                </Box>
              )}
            </For>
          </Box>
        </Box>

        <Box as="tbody">
          <For each={props.data}>
            {(item) => (
              <Box as="tr">
                <For each={props.columns}>
                  {(column, index) => (
                    <Box
                      as={index === 0 ? "td" : "td"}
                      key={column.id}
                      paddingX="$2"
                      paddingY="$5"
                      textAlign={column.align}
                    >
                      <Show
                        when={!!column.render}
                        else={
                          <Text
                            color={column.color}
                            fontWeight="$semibold"
                            fontSize="$xs"
                          >
                            {item[column.id]}
                          </Text>
                        }
                      >
                        {column.render(item, column)}
                      </Show>
                    </Box>
                  )}
                </For>
              </Box>
            )}
          </For>
        </Box>
      </Box>
    </Box>
  );
}
