// This is a made-up thing from us used for scaffolds, not from Mitosis CLI
// put it here to centralize config
module.exports = {
  modal: {
    // {from, to}
    // Maps from <Scaffold<something> /> to <something /> JSX tag name
    jsxMap: {
      ScaffoldModal: "Modal",
    },
    import: {
      imports: { Modal: "default" },
      path: "../modal",
    },
  },
  select: {
    jsxMap: {
      ScaffoldSelect: "Select",
    },
    import: {
      imports: { Select: "default" },
      path: "../select",
    },
  },
  "select-option": {
    jsxMap: {
      ScaffoldSelectOption: "SelectOption",
    },
    import: {
      imports: { SelectOption: "default" },
      path: "../select-option",
    },
  },
  popover: {
    jsxMap: {
      ScaffoldPopover: "Popover",
    },
    import: {
      imports: { Popover: "default" },
      path: "../popover",
    },
  },
  "popover-trigger": {
    jsxMap: {
      ScaffoldPopoverTrigger: "PopoverTrigger",
    },
    import: {
      imports: { PopoverTrigger: "default" },
      path: "../popover-trigger",
    },
  },
  "popover-content": {
    jsxMap: {
      ScaffoldPopoverContent: "PopoverContent",
    },
    import: {
      imports: { PopoverContent: "default" },
      path: "../popover-content",
    },
  },
  "chain-swap-combobox": {
    jsxMap: {
      ScaffoldChainSwapCombobox: "ChainSwapCombobox",
    },
    import: {
      imports: { ChainSwapCombobox: "default" },
      path: "../chain-swap-combobox",
    },
  },
  "change-chain-combobox": {
    jsxMap: {
      ScaffoldChangeChainCombobox: "ChangeChainCombobox",
    },
    import: {
      imports: { ChangeChainCombobox: "default" },
      path: "../change-chain-combobox",
    },
  },
  "number-input": {
    jsxMap: {
      ScaffoldNumberInput: "NumberInput",
    },
    import: {
      imports: { NumberInput: "default" },
      path: "../number-input",
    },
  },
};
