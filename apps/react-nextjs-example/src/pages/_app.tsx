import "@/styles/globals.css";
import "@interchain-ui/react/styles";
import "@interchain-ui/react/globalStyles";
import { ErrorBoundary } from "@/components/error-boundary";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
