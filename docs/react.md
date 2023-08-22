# How to use `@interchain-ui/react` in your react app

Follow these steps to use @interchain-ui/react:

- Install: `yarn add @interchain-ui/react`
- Import CSS stylesheet and wrap your top level layout component with our provider and our `themeClass`:

```TSX
// layout.tsx
import { ThemeProvider, useTheme } from '@interchain-ui/react';
import '@interchain-ui/react/styles';

export function Layout(props: LayoutProps) {
  const { theme, themeClass, setTheme } = useTheme();

  return (
    <ThemeProvider>
      <div className={themeClass}>
        {props.children}
      </div>
    </ThemeProvider>
  )
}
```

After these steps are done, you can import and use `@interchain-ui/react` components.
