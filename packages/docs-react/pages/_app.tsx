import "@interchain-ui/react/styles";
import { ThemeProvider } from "@interchain-ui/react";
import "../components/global.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
