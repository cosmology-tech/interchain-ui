import * as React from "react";
import { useEnhancedEffect } from "./utils";
import { ReactNoSSRProps } from "./react-no-ssr.types";

export function ReactNoSSR(props: ReactNoSSRProps): JSX.Element {
  const { children, defer = false, fallback = null } = props;
  const [mountedState, setMountedState] = React.useState(false);

  useEnhancedEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  React.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <>{mountedState ? children : fallback}</>;
}
