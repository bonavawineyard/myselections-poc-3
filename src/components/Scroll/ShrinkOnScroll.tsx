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
  const imageOuterRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useShrinkOnScroll({
    imageHeight,
    imageOuterRef,
    imageRef,
    shrinkTo,
    fixedSize,
    minHeight,
  });

  return (
    <div
      ref={imageOuterRef}
      style={{ height: imageHeight }}
      className="pointer-events-none"
    >
      <div ref={imageRef} style={{ height: "100%" }}>
        {children}
      </div>
    </div>
  );
};
