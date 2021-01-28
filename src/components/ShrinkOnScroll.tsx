import { FC, useContext, useEffect, useRef } from "react";
import { MainContext } from "../context/MainContext";
import { shrinkOnScroll } from "../utils/shrinkOnScroll";

export const ShrinkOnScroll: FC<{
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

      shrinkOnScroll(
        imageOuterElement,
        imageElement,
        shrinkTo,
        toggleShrunkState
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsShrunk, shrinkTo]);

  return (
    <div ref={imageOuterRef} style={{ height: imageHeight }}>
      <img ref={imageRef} src={src} alt="" style={{ height: "100%" }} />
    </div>
  );
};
