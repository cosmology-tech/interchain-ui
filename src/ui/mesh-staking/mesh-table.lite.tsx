import {
  Show,
  useStore,
  onMount,
  onUnMount,
  onUpdate,
  useRef,
  useMetadata,
  For,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import Table from "../table/table.lite";
import TableHead from "../table/table-head.lite";
import TableBody from "../table/table-body.lite";
import TableRow from "../table/table-row.lite";
import TableCell from "../table/table-cell.lite";
import TableColumnHeaderCell from "../table/table-column-header-cell.lite";
import TableRowHeaderCell from "../table/table-row-header-cell.lite";
import { meshThemeClass } from "../../styles/themes.css";
import {
  standardTransitionProperties,
  bottomShadow,
} from "../shared/shared.css";
import * as styles from "./mesh-staking.css";

import anime from "animejs";
import type { AnimeInstance } from "animejs";
import type { MeshTableProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshTable(props: MeshTableProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  let animationRef = useRef<AnimeInstance | null>(null);
  let cleanupRef = useRef<() => void>(null);

  const state = useStore({
    displayBottomShadow: false,
    pinnedRows: () => {
      if (!props.pinnedIds || (props.pinnedIds ?? []).length === 0) {
        return props.data;
      }

      return props.data.filter((row) => props.pinnedIds.includes(row.id));
    },
    unpinnedRows: () => {
      if (!props.pinnedIds || (props.pinnedIds ?? []).length === 0) {
        return props.data;
      }

      return props.data.filter((row) => !props.pinnedIds.includes(row.id));
    },
    shouldPinHeader: () => {
      const MAX_PINNED_ROWS = props.maxPinnedRows ?? 3;

      return (
        state.pinnedRows().length > 0 &&
        state.pinnedRows().length <= MAX_PINNED_ROWS
      );
    },
  });

  onMount(() => {
    if (measureRef) {
      if (measureRef.clientHeight >= 380) {
        state.displayBottomShadow = true;
      } else {
        state.displayBottomShadow = false;
      }

      const scrollHandler = () => {
        const height = Math.abs(
          measureRef.scrollHeight -
            measureRef.clientHeight -
            measureRef.scrollTop
        );
        console.log("delta", height);
        if (height < 1) {
          state.displayBottomShadow = false;
        } else {
          state.displayBottomShadow = true;
        }
      };

      measureRef.addEventListener("scroll", scrollHandler);

      cleanupRef = () => {
        if (measureRef) {
          measureRef.removeEventListener("scroll", scrollHandler);
        }
      };
    }
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    if (!shadowRef) return;

    // Animation not init yet
    if (shadowRef && !animationRef) {
      animationRef = anime({
        targets: shadowRef,
        opacity: [0, 1],
        height: [0, 36],
        delay: 50,
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    }

    if (state.displayBottomShadow) {
      animationRef?.restart();
    } else {
      animationRef?.reverse();
    }
  }, [state.displayBottomShadow, shadowRef]);

  return (
    <Box
      className={clx(meshThemeClass, props.className, styles.scrollBar)}
      width="100%"
      position="relative"
      backgroundColor="$cardBg"
      borderRadius="$lg"
      px={props.borderless ? "$0" : "$11"}
      pt={props.borderless ? "$0" : "$9"}
      pb={props.borderless ? "$0" : "$12"}
      borderColor={props.borderless ? undefined : "$divider"}
      borderWidth={props.borderless ? undefined : "1px"}
      borderStyle={props.borderless ? undefined : "$solid"}
      maxHeight={state.pinnedRows().length > 0 ? "380px" : "0px"}
      overflowY="auto"
      display="block"
      ref={measureRef}
      {...props.containerProps}
    >
      <Table {...props.tableProps} position="relative">
        <TableHead
          position={state.pinnedRows().length > 0 ? "sticky" : "relative"}
          top={state.pinnedRows().length > 0 ? "0px" : undefined}
          zIndex={state.pinnedRows().length > 0 ? "$100" : undefined}
        >
          <TableRow backgroundColor="$cardBg">
            <For each={props.columns}>
              {(column) => (
                <TableColumnHeaderCell
                  key={column.id}
                  width={column.width}
                  textAlign={column.align}
                >
                  <Text
                    fontSize="$sm"
                    fontWeight="$normal"
                    color="$textSecondary"
                  >
                    {column.label}
                  </Text>
                </TableColumnHeaderCell>
              )}
            </For>
          </TableRow>

          <Show when={state.pinnedRows().length > 0}>
            <For each={state.pinnedRows()}>
              {(pinnedRow, pinnedRowIndex) => (
                <TableRow
                  key={pinnedRow.id}
                  backgroundColor="$cardBg"
                  zIndex="$100"
                >
                  <For each={props.columns}>
                    {(column) => (
                      <TableColumnHeaderCell
                        key={column.id}
                        width={column.width}
                        textAlign={column.align}
                        height={props.rowHeight}
                        backgroundColor="$cardBg"
                        className={
                          pinnedRowIndex === state.pinnedRows().length - 1
                            ? styles.borderedTableCell
                            : ""
                        }
                      >
                        <Show
                          when={!!column.render}
                          else={
                            <Text
                              color={column.color ?? "$textPlaceholder"}
                              fontWeight="$normal"
                              fontSize="$xs"
                            >
                              {pinnedRow[column.id]}
                            </Text>
                          }
                        >
                          {column.render(pinnedRow, column, true)}
                        </Show>
                      </TableColumnHeaderCell>
                    )}
                  </For>
                </TableRow>
              )}
            </For>
          </Show>
        </TableHead>

        <TableBody
          overflowY={state.shouldPinHeader() ? "auto" : undefined}
          zIndex={state.shouldPinHeader() ? "$10" : undefined}
          position="relative"
        >
          <For each={state.unpinnedRows()}>
            {(row) => (
              <TableRow
                backgroundColor={{
                  hover: "rgba(218, 213, 227, 0.10)",
                }}
                className={clx(standardTransitionProperties, styles.tableRow)}
              >
                <For each={props.columns}>
                  {(column, index) => (
                    <>
                      <Show when={index === 0}>
                        <TableRowHeaderCell
                          key={`${row.id + column.id}`}
                          width={column.width}
                          height={props.rowHeight}
                          textAlign={column.align}
                          className={styles.tableCell}
                        >
                          <Show
                            when={!!column.render}
                            else={
                              <Text
                                color={column.color ?? "$textPlaceholder"}
                                fontWeight="$normal"
                                fontSize="$xs"
                              >
                                {row[column.id]}
                              </Text>
                            }
                          >
                            {column.render(row, column)}
                          </Show>
                        </TableRowHeaderCell>
                      </Show>

                      <Show when={index > 0}>
                        <TableCell
                          key={`${row.id + column.id}`}
                          width={column.width}
                          textAlign={column.align}
                          height={props.rowHeight}
                          className={styles.tableCell}
                        >
                          <Show
                            when={!!column.render}
                            else={
                              <Text
                                color={column.color ?? "$textPlaceholder"}
                                fontWeight="$normal"
                                fontSize="$xs"
                              >
                                {row[column.id]}
                              </Text>
                            }
                          >
                            {column.render(row, column)}
                          </Show>
                        </TableCell>
                      </Show>
                    </>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>

      <div
        ref={shadowRef}
        className={styles.bottomShadow}
        data-is-visible={state.displayBottomShadow}
      />
    </Box>
  );
}
