import * as React from "react";
import { useState, forwardRef, useEffect } from "react";
import { buttonStyles } from "./button.css";
import { ButtonProps, ButtonState } from "./button.types";

const Button = forwardRef<ButtonProps["forwardedRef"]>(function Button(
  props: ButtonProps,
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
          <button ref={forwardedRef} className={buttonStyles}>
            {props.children}
          </button>
        </>
      ) : null}
    </>
  );
});

export default Button;
