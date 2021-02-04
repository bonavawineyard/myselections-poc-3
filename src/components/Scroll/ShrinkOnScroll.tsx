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

  const isOutside =
    behaviour === "fixed_size_outside" ||
    behaviour === "fixed_size_outside_bottom";

  const getStyle = () =>
    isOutside
      ? { maxWidth: "1024px", transition: "all 0.2s" }
      : { height: "100%" };

  return (
    <div
      ref={outerContainerRef}
      style={{ height: imageHeight }}
      className={`${!isOutside ? "pointer-events-none" : ""}`}
    >
      <div ref={innerContainerRef} style={getStyle()}>
        {children}
      </div>
    </div>
  );
};
