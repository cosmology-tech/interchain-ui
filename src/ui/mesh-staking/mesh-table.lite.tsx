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
import Divider from "../divider";
import Text from "../text";
import Table from "../table/table.lite";
import TableHead from "../table/table-head.lite";
import TableBody from "../table/table-body.lite";
import TableRow from "../table/table-row.lite";
import TableCell from "../table/table-cell.lite";
import TableColumnHeaderCell from "../table/table-column-header-cell.lite";
import TableRowHeaderCell from "../table/table-row-header-cell.lite";
import { standardTransitionProperties } from "../shared/shared.css";
import * as styles from "./mesh-staking.css";

import { store } from "../../models/store";
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

  const pinnedTableMeasureRef = useRef<HTMLDivElement>(null);
  const pinnedTableShadowRef = useRef<HTMLDivElement>(null);

  let animationRef = useRef<AnimeInstance | null>(null);
  let pinnedTableAnimationRef = useRef<AnimeInstance | null>(null);

  let cleanupRef = useRef<() => void>(null);

  const state = useStore({
    theme: "light",
    displayBottomShadow: false,
    displayPinnedTableBottomShadow: false,
    pinnedRows: [],
    unpinnedRows: [],
    shouldSplitPinnedTable: () => {
      const DEFAULT_SPLIT_THRESHOLD = 4;
      const threshold = props.maxPinnedRows ?? DEFAULT_SPLIT_THRESHOLD;

      return state.pinnedRows.length > 0 && state.pinnedRows.length > threshold;
    },
    shouldPinHeader: () => {
      if (
        props.pinnedIds == null ||
        (Array.isArray(props.pinnedIds) && (props.pinnedIds ?? []).length === 0)
      ) {
        return false;
      }

      return props.pinnedIds.length > 0 && state.pinnedRows.length > 0;
    },
  });

  onMount(() => {
    state.theme = store.getState().theme;

    let cleanupStore = store.subscribe((newState) => {
      state.theme = newState.theme;
    });

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
            measureRef.scrollTop,
        );

        if (height < 1) {
          state.displayBottomShadow = false;
        } else {
          state.displayBottomShadow = true;
        }
      };

      measureRef.addEventListener("scroll", scrollHandler);

      cleanupRef = () => {
        if (cleanupStore) {
          cleanupStore();
        }

        if (measureRef) {
          measureRef.removeEventListener("scroll", scrollHandler);
        }
      };
    }

    if (pinnedTableMeasureRef) {
      if (pinnedTableMeasureRef.clientHeight >= 380) {
        state.displayPinnedTableBottomShadow = true;
      } else {
        state.displayPinnedTableBottomShadow = false;
      }

      const scrollHandler = () => {
        const height = Math.abs(
          pinnedTableMeasureRef.scrollHeight -
            pinnedTableMeasureRef.clientHeight -
            pinnedTableMeasureRef.scrollTop,
        );

        if (height < 1) {
          state.displayPinnedTableBottomShadow = false;
        } else {
          state.displayPinnedTableBottomShadow = true;
        }
      };

      pinnedTableMeasureRef.addEventListener("scroll", scrollHandler);

      cleanupRef = () => {
        if (cleanupStore) {
          cleanupStore();
        }

        if (pinnedTableMeasureRef) {
          pinnedTableMeasureRef.removeEventListener("scroll", scrollHandler);
        }
      };
    }
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    let newPinnedRows = [];
    let newUnpinnedRows = [];

    if (!props.pinnedIds || (props.pinnedIds ?? []).length === 0) {
      state.pinnedRows = [];
    } else {
      newPinnedRows = props.data.filter((row) =>
        props.pinnedIds.includes(row.id),
      );
    }

    if (!props.pinnedIds || (props.pinnedIds ?? []).length === 0) {
      state.unpinnedRows = props.data;
    } else {
      newUnpinnedRows = props.data.filter(
        (row) => !props.pinnedIds.includes(row.id),
      );
    }

    state.pinnedRows = newPinnedRows;
    state.unpinnedRows = newUnpinnedRows;
  }, [props.data, props.pinnedIds]);

  onUpdate(() => {
    if (!pinnedTableShadowRef) return;

    // Animation not init yet
    if (pinnedTableShadowRef && !pinnedTableAnimationRef) {
      pinnedTableAnimationRef = anime({
        targets: pinnedTableShadowRef,
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

    if (state.displayPinnedTableBottomShadow) {
      pinnedTableAnimationRef?.restart();
    } else {
      pinnedTableAnimationRef?.reverse();
    }
  }, [state.displayPinnedTableBottomShadow, pinnedTableShadowRef]);

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
      className={clx(props.className, styles.scrollBar)}
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
      {...props.containerProps}
    >
      <Box
        position="relative"
        display={state.shouldSplitPinnedTable() ? "block" : "none"}
        maxHeight={state.shouldSplitPinnedTable() ? "214px" : undefined}
        boxRef={pinnedTableMeasureRef}
        overflowY="auto"
      >
        <Table {...props.tableProps} position="relative">
          <TableHead position="relative">
            <TableRow backgroundColor="$cardBg">
              <For each={props.columns}>
                {(column, colIndex) => (
                  <TableColumnHeaderCell
                    key={column.id}
                    position="sticky"
                    top="$0"
                    backgroundColor="$cardBg"
                    zIndex="$100"
                    width={column.width}
                    textAlign={column.align}
                    paddingX={colIndex === 0 ? "$6" : "$2"}
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

            <For each={state.pinnedRows}>
              {(pinnedRow, pinnedRowIndex) => (
                <TableRow
                  key={pinnedRow.id}
                  zIndex="$100"
                  className={clx(standardTransitionProperties, styles.tableRow)}
                >
                  <For each={props.columns}>
                    {(column) => (
                      <TableColumnHeaderCell
                        key={column.id}
                        width={column.width}
                        textAlign={column.align}
                        height={props.rowHeight}
                        backgroundColor="$cardBg"
                        paddingY="$0"
                        className={clx({
                          [styles.firstRowCell]: pinnedRowIndex === 0,
                          [styles.lastRowCell]:
                            pinnedRowIndex === state.pinnedRows.length - 1,
                        })}
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
          </TableHead>
        </Table>

        <div
          ref={pinnedTableShadowRef}
          className={clx({
            [styles.bottomShadow.light]: state.theme === "light",
            [styles.bottomShadow.dark]: state.theme === "dark",
          })}
          data-is-visible={state.displayBottomShadow}
        />
      </Box>

      <Show when={state.shouldSplitPinnedTable()}>
        <Box paddingX="$6">
          <Divider />
        </Box>
      </Show>

      <Box
        boxRef={measureRef}
        position="relative"
        maxHeight={state.shouldPinHeader() ? "312px" : undefined}
        overflowY="auto"
        display="block"
      >
        <Table {...props.tableProps} position="relative">
          <TableHead
            position={state.shouldPinHeader() ? "sticky" : "relative"}
            top={state.shouldPinHeader() ? "0px" : undefined}
            zIndex={state.shouldPinHeader() ? "$100" : undefined}
          >
            <Show when={!state.shouldSplitPinnedTable()}>
              <TableRow backgroundColor="$cardBg">
                <For each={props.columns}>
                  {(column, colIndex) => (
                    <TableColumnHeaderCell
                      key={column.id}
                      width={column.width}
                      textAlign={column.align}
                      paddingX={colIndex === 0 ? "$6" : "$2"}
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
            </Show>

            <Show
              when={state.shouldPinHeader() && !state.shouldSplitPinnedTable()}
            >
              <For each={state.pinnedRows}>
                {(pinnedRow, pinnedRowIndex) => (
                  <TableRow
                    key={pinnedRow.id}
                    zIndex="$100"
                    className={clx(
                      standardTransitionProperties,
                      styles.tableRow,
                    )}
                  >
                    <For each={props.columns}>
                      {(column) => (
                        <TableColumnHeaderCell
                          key={column.id}
                          width={column.width}
                          textAlign={column.align}
                          height={props.rowHeight}
                          backgroundColor="$cardBg"
                          paddingY="$0"
                          className={clx({
                            [styles.firstRowCell]: pinnedRowIndex === 0,
                            [styles.lastRowCell]:
                              pinnedRowIndex === state.pinnedRows.length - 1,
                            [styles.borderedTableCell]:
                              state.shouldPinHeader() &&
                              pinnedRowIndex === state.pinnedRows.length - 1,
                          })}
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
            className={styles.tableBody}
          >
            <For each={state.unpinnedRows}>
              {(row) => (
                <TableRow
                  key={row.id}
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
                            paddingY="$0"
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
                            paddingY="$0"
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

        <Show when={state.shouldPinHeader()}>
          <div
            ref={shadowRef}
            className={clx({
              [styles.bottomShadow.light]: state.theme === "light",
              [styles.bottomShadow.dark]: state.theme === "dark",
            })}
            data-is-visible={state.displayBottomShadow}
          />
        </Show>
      </Box>
    </Box>
  );
}
