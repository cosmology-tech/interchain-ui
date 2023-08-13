import {style, keyframes} from '@vanilla-extract/css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export const loader = style({
  // width: "48px",
  // height: "48px",
  // border: "5px solid red",
  // borderBottomColor: "transparent",
  // borderRadius: "50%",
  // display: "inline-block",
  // boxSizing: "border-box",
  animation: `${rotate} 1s linear infinite`,
  })
