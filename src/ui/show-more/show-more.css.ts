import {style, styleVariants} from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

export const container = style({
  position: "relative",
  overflow: "hidden",
})

export const shadow = style({
  backgroundImage: "linear-gradient(transparent, white)"
})

export const moreBox = style({
  cursor: "pointer",
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "198px",
})

export const btnContainer = style({
  display: "flex",
  alignItems: "center",
})
