// This is a made-up thing from us used for scaffolds, not from Mitosis CLI
// put it here to centralize config
module.exports.scaffoldConfig = {
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
  combobox: {
    jsxMap: {
      ScaffoldCombobox: "Combobox",
    },
    import: {
      imports: { Combobox: "default" },
      path: "../combobox",
    },
  },
  slider: {
    jsxMap: {
      ScaffoldSlider: "Slider",
    },
    import: {
      imports: { Slider: "default" },
      path: "../slider",
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
  "number-field": {
    jsxMap: {
      ScaffoldNumberField: "NumberField",
    },
    import: {
      imports: { NumberField: "default" },
      path: "../number-field",
    },
  },
  "governance-checkbox": {
    jsxMap: {
      ScaffoldGovernanceCheckbox: "GovernanceCheckbox",
    },
    import: {
      imports: { GovernanceCheckbox: "default" },
      path: "../governance-checkbox",
    },
  },
  "governance-radio": {
    jsxMap: {
      ScaffoldGovernanceRadio: "GovernanceRadio",
    },
    import: {
      imports: { GovernanceRadio: "default" },
      path: "../governance-radio",
    },
  },
  "governance-radio-group": {
    jsxMap: {
      ScaffoldGovernanceRadioGroup: "GovernanceRadioGroup",
    },
    import: {
      imports: { GovernanceRadioGroup: "default" },
      path: "../governance-radio-group",
    },
  },
  "noble-chain-combobox": {
    jsxMap: {
      ScaffoldNobleChainCombobox: "NobleChainCombobox",
    },
    import: {
      imports: { NobleChainCombobox: "default" },
      path: "../noble-chain-combobox",
    },
  },
};

// Only allow these components for each target, if null = allow all
// This is kinda like feature flag for components
module.exports.compileAllowList = {
  react: null,
  vue: [
    // "avatar",
    // "avatar-badge",
    // "avatar-image",
    // "avatar-name",
    "box",
    "theme-provider",
    "text",
    "button",
    // "callout",
    // "stack",
    // "center",
    // "icon-button",
    // "spinner",
    // "tooltip",
    // "animate-layout",
    // "container",
    // "divider",
    // "fade-in",
    // "field-label",
    // "icon",
    // "link",
    // "qrcode",
    // "reveal",
    // "skeleton",
    // "breadcrumb",
    // "clipboard-copy-text",
    // "toast",
    // "connect-modal",
    // "connect-modal-head",
    // "connect-modal-install-button",
    // "connect-modal-qrcode",
    // "connect-modal-qrcode-error",
    // "connect-modal-qrcode-skeleton",
    // "connect-modal-status",
    // "connect-modal-wallet-button",
    // "connect-modal-wallet-list",
    // ====
    // "interchain-ui-provider",
    // "basic-modal",
  ],
};
