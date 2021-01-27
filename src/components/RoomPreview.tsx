import { FC, useContext, useEffect, useRef } from "react";
import { MainContext } from "./MainContext";

export const RoomPreview: FC<{
  imageHeight: string;
  shrinkTo?: "left" | "top" | "right";
}> = ({ imageHeight, shrinkTo = "left" }) => {
  const imageOuterRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { isShrunk, setIsShrunk } = useContext(MainContext);

  useEffect(() => {
    const imageInnerElement = imageRef.current as HTMLImageElement;
    const imageOuterElement = imageOuterRef.current as HTMLDivElement;

    const handleScroll = () => {
      const {
        top: outerTop,
        bottom: outerBottom,
        height: outerHeight,
      } = imageOuterElement.getBoundingClientRect();

      // When the image placeholder is above viewport - image should shrink
      if (outerTop < 0) {
        if (!isShrunk) {
          setIsShrunk(true);
          imageInnerElement.style.position = "fixed";
          imageInnerElement.style.top = "0";
        }

        const percentVisible = Math.round(
          ((outerHeight + outerTop) / outerHeight) * 100
        );

        if (percentVisible > 30) {
          imageInnerElement.style.height = outerBottom + "px";
        }
      }

      // When scrolling up - image should grow
      if (outerTop > 0 && imageInnerElement.style.position === "fixed") {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, [isShrunk, setIsShrunk]);

  useEffect(() => {
    if (!isShrunk) {
      const imageInnerElement = imageRef.current as HTMLImageElement;
      imageInnerElement.style.removeProperty("position");
      imageInnerElement.style.removeProperty("top");
      imageInnerElement.style.height = "100%";
    }
  }, [isShrunk]);

  return (
    <div ref={imageOuterRef} style={{ height: imageHeight }}>
      <img
        ref={imageRef}
        src="/layers/Modern_style_base/Modern_style_base.png"
        alt=""
        style={{ height: "100%" }}
      />
    </div>
  );
};
