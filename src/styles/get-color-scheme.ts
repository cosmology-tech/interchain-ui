import { useStore, onMount, onUpdate } from "@builder.io/mitosis";

const query = (mode: string) => `(prefers-color-scheme: ${mode})`;
const darkQuery = window.matchMedia?.(query(`dark`));
const lightQuery = window.matchMedia?.(query(`light`));

export const getColorScheme = () => {
  const isDark = darkQuery?.matches;
  const isLight = lightQuery?.matches;

  const preferredColorScheme = useStore<{ colorScheme: "light" | "dark" }>({
    colorScheme: `light`,
  });

  onUpdate(() => {
    if (isDark) preferredColorScheme.colorScheme = `dark`;
    else if (isLight) preferredColorScheme.colorScheme = `light`;
  }, [isDark, isLight]);

  onMount(() => {
    const darkListener = ({ matches }: { matches: any }) => {
      if (!matches) return;
      preferredColorScheme.colorScheme = `dark`;
    };

    const lightListener = ({ matches }: { matches: any }) => {
      if (!matches) return;
      preferredColorScheme.colorScheme = `light`;
    };

    darkQuery!.addEventListener(`change`, darkListener);
    lightQuery!.addEventListener(`change`, lightListener);

    return () => {
      darkQuery!.removeEventListener(`change`, darkListener);
      lightQuery!.removeEventListener(`change`, lightListener);
    };
  });

  return preferredColorScheme.colorScheme;
};
