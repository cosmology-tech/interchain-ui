import { useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import { skeleton } from "../shared/shared.css";
import type { SkeletonProps } from "./skeleton.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Skeleton(props: SkeletonProps) {
  return <Box {...props} className={clx(props.className, skeleton)} />;
}
