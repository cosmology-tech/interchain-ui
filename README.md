# Cosmology UI Kit

## 📣 What is this project?

Cosmology UI Kit is a foundation library for all UI elements used in cosmos-kit and other packages.
The main features of Cosmology UI Kit is that it's cross-framework, easy to use and extend and allows developers to customize their own custom themes.
It is based on a project called `mitosis` from BuilderIO to compile from a mutual format (lite JSX) to other frontend framework source code, which gives us
the ability to code a component once, and it will compile to all framework targets.

## Setup

```bash
# If you use react
yarn add @cosmology-ui/react

# If you use vue
yarn add @cosmology-ui/vue
```

## Setup and scripts for development

- `yarn && yarn bootstrap` to bootstrap the repo
- `yarn dev` to watch the repo for changes and then recompile
- `yarn compile` to compile from mitosis components to other packages, you can give it a flag `-p` or `--platforms` .ie `yarn compile -p react vue`
- `yarn c:react` or `yarn c:vue` to compile specifically to react or vue
- `yarn clean` to clean `.node_modules` or `yarn clean:assets` to clean build/compile output

## Overview and structure

![Overview](./docs/overview-ui-kit.png)
We create components inside a single source of truth folder `<root>/src` with Mitosis lite JSX format, then through our compiler, it's going to compile our components and build it in sub packages' `src` and `dist`.

When we publish packages, we are actually publishing the sub packages generated from `<root>/src`, which are `packages/react` and `packages/vue`, not the `<root>/src` itself.

The compiler is a wrapper over `@builder.io/mitosis` CLI with some extra source code handling logic and some nice CLI add-ons like arguments handling...etc.

There are some rules of thumbs and some tips for creating Mitosis components:

- File names must end with `*.lite.tsx`
- Style sheets must be in `*.css.ts` files, this is because we use a styling solution called `vanilla-extract` to have a CSS-in-JS API across all frameworks.
- For a component, you must use default export, not named export. This is a limitation of Mitosis
- There are more rules and limitations, please read more about Mitosis [here](https://github.com/BuilderIO/mitosis/tree/main/docs)
- To quickly test to see the compilation result from one Mitosis to any framework source code, please use
[mitosis sandbox](https://mitosis.builder.io/). It's similar to TS playground but for Mitosis testing purpose.

## Icon

Check ![Icon guide](./docs/icons.md) to know how to add more icons

## Our Website

⚛️ https://cosmoskit.com/

## Credits

🛠 Built by Cosmology — if you like our tools, please consider delegating to [our validator ⚛️](https://cosmology.tech/validator)
