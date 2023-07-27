# Components compiler

Our compiler is based around a beta package `mitosis` from a product company called Builder.io. `mitosis` 's whole purpose is to: write once - compile to every framework. From a familiar but limited in features file format `.lite.tsx`, `mitosis` can compile to every framework by first transforming it to an AST, then parse and output to specific framework code like React/Vue/Angular...etc

In our `interchain-ui` repository, the structure of our packages also adheres to the write one - compile everywhere principle:
Write code once in `<root>/src`, compile to `packages/<framework>`.

When we publish packages, we are actually publishing the sub packages `packages/<framework>` generated from `<root>/src`.

The compiler is a wrapper over `@builder.io/mitosis` CLI with some extra logic to handle around the build process. It's located in `<root>/compiler`.

- `compiler/base.js` is the core of compile logic.
- `compiler/frameworks` contains some logic that only apply to some specific framework target.
- `compiler/dev.js` handles the dev process, it will start a watcher to listen for changes in `/src` and trigger recompilation accordingly.
- `compiler/mitosis.config.js` contains the configuration used in `@builder.io/mitosis` package
- `compiler/scaffold.config.js` contains scaffolding config.

There are some rules of thumbs and some tips for creating Mitosis components:

- File names must end with `*.lite.tsx`
- Style sheets must be in `*.css.ts` files, this is because we use a styling solution called `vanilla-extract` to have a CSS-in-JS API across all frameworks.
- For a component, you must use default export, not named export. This is a limitation of Mitosis
- There are more rules and limitations, please read more about Mitosis [here](https://github.com/BuilderIO/mitosis/tree/main/docs)
- To quickly test to see the compilation result from one Mitosis to any framework source code, please use
[mitosis sandbox](https://mitosis.builder.io/). It's similar to TS playground but for Mitosis testing purpose.
