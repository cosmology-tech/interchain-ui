# How to use `@interchain-ui/react`` in your react app

Follow these steps to use @interchain-ui/react:

- Install: `yarn add @interchain-ui/react`
- Create a custom hook to consume our theme store:

```TS
// use-theme.tsx

import { ModePreference, store } from '@interchain-ui/react';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

const useStore = create(store);

const useInterchainStore = () => {
  return useStore(
    (state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
      setThemeMode: state.setThemeMode,
    }),
    shallow
  );
};

export function useTheme() {
  const { theme, setThemeMode, themeClass } = useInterchainStore();

  const setModalTheme = useCallback((mode: ModePreference) => {
    setThemeMode(mode);
  }, []);

  return {
    theme,
    themeClass,
    setModalTheme,
  };
}
```

The reason why we have to create a custom hook like this is because theme store is a vanilla zustand store and its APIs are not bound directly to any UI framework, this is to keep everything portable between different UI frameworks.

- Import CSS stylesheet and wrap your top level layout component with our provider and our `themeClass`:

```TSX
// layout.tsx
import { ThemeProvider } from '@interchain-ui/react';
import { useTheme } from './use-theme';
import '@interchain-ui/react/styles';

export function Layout(props: LayoutProps) {
  const { themeClass } = useTheme();

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
