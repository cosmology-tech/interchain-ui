import * as React from "react";
import { useState, forwardRef, useEffect } from "react";
import { BoxProps, BoxState } from "./box.types";

const Box = forwardRef<BoxProps["forwardedRef"]>(function Box(
  props: BoxProps,
  forwardedRef
) {
  const [loaded, setLoaded] = useState(() => false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <div ref={forwardedRef}>{props.children}</div>
        </>
      ) : null}
    </>
  );
});

export default Box;
