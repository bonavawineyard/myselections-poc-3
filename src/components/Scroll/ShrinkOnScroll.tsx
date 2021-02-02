import { FC, ReactNode, useRef } from "react";
import { useShrinkOnScroll } from "../../hooks/useShrinkOnScroll";
import { IBehaviour, IShrinkTo } from "../../interfaces";

export const ShrinkOnScroll: FC<{
  imageHeight: number;
  minHeight: number;
  shrinkTo?: IShrinkTo;
  children: ReactNode;
  behaviour: IBehaviour;
}> = ({ imageHeight, shrinkTo = "left", minHeight, children, behaviour }) => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);

  useShrinkOnScroll({
    imageHeight,
    outerContainerRef,
    innerContainerRef,
    shrinkTo,
    minHeight,
    behaviour,
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
