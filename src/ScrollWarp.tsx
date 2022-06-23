import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
  useSpring
} from "framer-motion";
import { useId } from "react";
import { useScrollValue } from "scrollex";

const springConfig = {
  mass: 0.5,
  damping: 40,
  stiffness: 250
};

interface ScrollWarpProps extends React.HTMLProps<HTMLDivElement> {}

const ScrollWarp = ({ children, ...otherProps }: ScrollWarpProps) => {
  const id = useId();
  let velocity = useScrollValue(({ velocity }) => velocity);
  velocity = useTransform(velocity, (v) => v || 0);
  const scale = useTransform(velocity, (v) => 1 + Math.abs(v) / 40000);
  const transformOrigin = useTransform(velocity, (v) =>
    v > 0 ? "bottom center" : "top center"
  );
  const topCurve = useTransform(velocity, (v) => -v / 20000);
  const bottomCurve = useTransform(velocity, (v) => 1 - v / 20000);
  const scaleSpring = useSpring(scale, springConfig);
  const topCurveAmountSpring = useSpring(topCurve, springConfig);
  const bottomCurveAmountSpring = useSpring(bottomCurve, springConfig);
  const d = useMotionTemplate`M 0 0 Q 0.5 ${topCurveAmountSpring} 1 0 L 1 1 Q 0.5 ${bottomCurveAmountSpring} 0 1 L 0 1`;
  return (
    <div
      {...otherProps}
      style={{ ...otherProps.style, clipPath: `url(#${id})` }}
    >
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <motion.path d={d}></motion.path>
          </clipPath>
        </defs>
      </svg>
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          scale: scaleSpring,
          transformOrigin
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollWarp;
