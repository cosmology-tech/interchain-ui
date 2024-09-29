import {
  Show,
  For,
  onMount,
  onUnMount,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import * as styles from "./timeline.css";
import { store, UIState } from "../../models/store";
import type { TimelineProps } from "./timeline.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Timeline(props: TimelineProps) {
  const state = useStore<{
    internalTheme: UIState["theme"];
  }>({
    internalTheme: store.getState().theme,
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    cleanupRef = store.subscribe((newState, prevState) => {
      state.internalTheme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") {
      cleanupRef();
    }
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$16"
      className={styles.timeline}
      attributes={{
        "data-testid": "timeline",
      }}
    >
      <For each={props.events}>
        {(event, index) => (
          <Box
            className={clx(props.className, styles.eventItemsContainer)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            attributes={{
              "data-is-even": index % 2 === 0,
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              className={styles.eventItem}
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
                    : styles.eventContentLeft,
                )}
                attributes={{
                  "data-testid": "event-content",
                }}
              >
                <Show when={!event.customContent}>
                  <Box display="flex" flexDirection="column" gap="$9">
                    <Text
                      color="$textSecondary"
                      fontWeight="$normal"
                      fontSize="$md"
                      {...event.eventTimestampProps}
                    >
                      {event.timestamp}
                    </Text>

                    <Text
                      color="$text"
                      fontWeight="$medium"
                      fontSize="$3xl"
                      {...event.eventTitleProps}
                    >
                      {event.title}
                    </Text>

                    <Show when={event.description}>
                      <Text
                        color="$text"
                        fontWeight="$medium"
                        fontSize="$md"
                        {...event.eventDescriptionProps}
                      >
                        {event.description}
                      </Text>
                    </Show>
                  </Box>
                </Show>

                <Show when={event.customContent}>
                  <div>{event.customContent}</div>
                </Show>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              className={styles.eventItemSecondary}
              attributes={{
                "data-testid": "event-item-secondary",
                "data-direction": index % 2 === 0 ? "right" : "left",
                "aria-hidden": !event.secondaryContent,
              }}
            >
              <Show when={!!event.secondaryContent}>
                <Box
                  attributes={{
                    "data-testid": "event-content-secondary",
                  }}
                  className={clx(
                    index % 2 === 0
                      ? styles.eventContentLeft
                      : styles.eventContentRight,
                  )}
                >
                  {event.secondaryContent}
                </Box>
              </Show>
            </Box>

            <Box className={styles.rowSeparator} aria-hidden="true">
              <div
                className={styles.eventCircle}
                data-direction={index % 2 === 0 ? "right" : "left"}
                aria-hidden="true"
              >
                <div
                  className={styles.eventCircleInner}
                  data-theme={state.internalTheme}
                />
              </div>

              <div
                className={styles.eventBar}
                data-direction={index % 2 === 0 ? "right" : "left"}
                data-is-last={index === props.events.length - 1}
                aria-hidden="true"
              />
            </Box>
          </Box>
        )}
      </For>
    </Box>
  );
}
