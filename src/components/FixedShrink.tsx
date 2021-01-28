import { FC, useRef } from "react";
import { useShrinkOnScroll } from "../hooks/useShrinkOnScroll";

export const FixedShrink: FC<{
  imageHeight: string;
  shrinkTo?: "left" | "right";
  src: string;
}> = ({ imageHeight, shrinkTo = "left", src }) => {
  const imageOuterRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useShrinkOnScroll({
    imageHeight,
    imageOuterRef,
    imageRef,
    shrinkTo,
    fixedSize: true,
    minHeight: 23,
  });

  return (
    <div ref={imageOuterRef} style={{ height: imageHeight }}>
      <div
        ref={imageRef}
        style={{
          height: "100%",
          maxHeight: "768px",
          transition: "all 0.3s",
        }}
      >
        <img src={src} alt="" style={{ maxHeight: "100%" }} />
      </div>
    </div>
  );
};
