import { FC, ReactNode, useRef } from "react";
import { useShrinkOnScroll } from "../../hooks/useShrinkOnScroll";

export const ShrinkOnScroll: FC<{
  imageHeight: number;
  minHeight: number;
  shrinkTo?: "left" | "right";
  fixedSize?: boolean;
  children: ReactNode;
}> = ({
  imageHeight,
  shrinkTo = "left",
  minHeight,
  children,
  fixedSize = false,
}) => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);

  useShrinkOnScroll({
    imageHeight,
    outerContainerRef,
    innerContainerRef,
    shrinkTo,
    fixedSize,
    minHeight,
  });

  return (
    <div
      ref={outerContainerRef}
      style={{ height: imageHeight }}
      className="pointer-events-none"
    >
      <div ref={innerContainerRef} style={{ height: "100%" }}>
        {children}
      </div>
    </div>
  );
};
