import { FC, useContext, useEffect, useRef } from "react";
import { MainContext } from "../context/MainContext";
import { fixedShrinkOnScroll } from "../utils/shrinkOnScroll";

export const FixedShrink: FC<{
  imageHeight: string;
  shrinkTo?: "left" | "right";
  src: string;
}> = ({ imageHeight, shrinkTo = "left", src }) => {
  const imageOuterRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { setIsShrunk } = useContext(MainContext);

  useEffect(() => {
    const imageElement = imageRef.current as HTMLImageElement;
    const imageOuterElement = imageOuterRef.current as HTMLDivElement;

    const handleScroll = () => {
      const toggleShrunkState = (isShrunk: boolean) => {
        setIsShrunk(!isShrunk);
      };

      fixedShrinkOnScroll({
        imageOuterElement,
        imageElement,
        shrinkTo,
        imageHeight,
        onShrunkChange: toggleShrunkState,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imageHeight, setIsShrunk, shrinkTo]);

  return (
    <div ref={imageOuterRef} style={{ height: imageHeight }}>
      <img
        ref={imageRef}
        src={src}
        alt=""
        style={{
          maxHeight: "768px",
          transition: "all 0.3s",
        }}
      />
    </div>
  );
};
