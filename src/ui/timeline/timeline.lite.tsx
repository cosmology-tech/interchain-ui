import { Show, For, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import * as styles from "./timeline.css";
import type { TimelineProps } from "./timeline.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Timeline(props: TimelineProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$6"
      className={styles.timeline}
      attributes={{
        "data-testid": "timeline",
      }}
    >
      <For each={props.events}>
        {(event, index) => (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            alignSelf={index % 2 === 0 ? "flex-start" : "flex-end"}
            className={clx(event.className, styles.eventItem)}
            attributes={{
              "data-testid": "event-item",
            }}
          >
            <Box
              p="$8"
              backgroundColor="$cardBg"
              borderColor="$divider"
              borderStyle="solid"
              borderWidth="1px"
              borderRadius="$md"
              boxShadow="$sm"
              className={clx(
                styles.eventContent,
                index % 2 === 0
                  ? styles.eventContentArrowRight
                  : styles.eventContentArrowLeft,
                index % 2 === 0
                  ? styles.eventContentRight
                  : styles.eventContentLeft
              )}
              attributes={{
                "data-testid": "event-content",
              }}
            >
              <Show when={!event.customContent}>
                <Text
                  color="$textSecondary"
                  fontWeight="$normal"
                  fontSize="$sm"
                  attributes={{
                    paddingBottom: "$4",
                  }}
                >
                  {event.timestamp}
                </Text>

                <Text color="$text" fontWeight="$semibold" fontSize="$md">
                  {event.title}
                </Text>

                <Show when={event.description}>
                  <Text color="$text" fontWeight="$normal" fontSize="$sm">
                    {event.description}
                  </Text>
                </Show>
              </Show>

              <Show when={event.customContent}>
                <div>{event.customContent}</div>
              </Show>
              <div
                className={styles.eventCircle}
                data-direction={index % 2 === 0 ? "right" : "left"}
              />

              <div
                className={styles.eventBar}
                data-direction={index % 2 === 0 ? "right" : "left"}
                data-is-last={index === props.events.length - 1}
              />
            </Box>
          </Box>
        )}
      </For>
    </Box>
  );
}
