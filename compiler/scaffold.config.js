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
};
