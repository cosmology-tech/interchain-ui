# Custom theme

By default, all Interchain UI components inherit values from the default theme. In some scenarios, you might need to customize the theme tokens to match your design requirements.

## Customizing theme tokens

To extend or override a token in the default theme, provide the `themeDefs` and `customTheme` props to `<ThemeProvider />` and add the keys/tokens you'd like to override. You **CANNOT** add new values to the theme due to the static nature of our current styling solution, which is vanilla-extract CSS. We will improve to allow this capability soon.

For example, if you'd like to update the colors in the theme to include your brand colors, here's what you'll do:

```TSX

<ThemeProvider
  themeDefs={[
    {
      {/* Provide a unique name for your custom theme */}
      name: "custom",
      vars: {
        colors: {
          {/* Override your branding colors */}
          primary500: "#4A5568",
        },
      },
    },
  ]}
  {/* Custom theme name, this corresponds to one of the theme provided in themeDefs prop */}
  customTheme="custom"
>
  {children}
</ThemeProvider>
```

The full shape of tokens can be found in `theme.css.ts` file in `themeContractTemplate` object.

## Customizing component styles

For some cases when you need to override some very specific vars only scoped to a component, you can use our `overrides` props for `<ThemeProvider />`.
It is a record/object which has keys corresponding to component slots name, and the values has the shape of overridable props mapped to CSS values.

```TSX
<ThemeProvider
  overrides={{
    // Slot named 'button'
    button: {
      // map overridable props to their values for each theme mode
      bg: {
        light: "red",
        dark: "blue",
      },
    },
  }}
>
  {children}
</ThemeProvider>
```
