import { FC, useContext, useEffect, useRef } from "react";
import { MainContext } from "../context/MainContext";

const getPercentVisible = (rect: DOMRect) => {
  const { top: outerTop, height: outerHeight } = rect;
  return Math.round(((outerHeight + outerTop) / outerHeight) * 100);
};

export const RoomPreview: FC<{
  imageHeight: string;
  shrinkTo?: "left" | "right";
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
        left: outerLeft,
        width: outerWidth,
      } = imageOuterElement.getBoundingClientRect();

      // When the image placeholder is above viewport - image should shrink
      if (outerTop < 0) {
        if (!isShrunk) {
          setIsShrunk(true);
          imageInnerElement.style.position = "fixed";
          imageInnerElement.style.top = "0";
          imageInnerElement.style.boxShadow = "0px 0px 5px 1px";

          if (shrinkTo === "right") {
            const rightPosition =
              document.body.clientWidth - (outerLeft + outerWidth);
            imageInnerElement.style.right = rightPosition + "px";
          }
        }

        if (getPercentVisible(imageOuterElement.getBoundingClientRect()) > 30) {
          imageInnerElement.style.height = outerBottom + "px";
        }
      }

      // When scrolling up - image should grow
      if (outerTop > 0 && imageInnerElement.style.position === "fixed") {
        setIsShrunk(false);
      }
    };

    if (typeof isShrunk === "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
  }, [isShrunk, setIsShrunk, shrinkTo]);

  useEffect(() => {
    if (!isShrunk) {
      const imageInnerElement = imageRef.current as HTMLImageElement;
      imageInnerElement.style.removeProperty("position");
      imageInnerElement.style.removeProperty("top");
      imageInnerElement.style.removeProperty("right");
      imageInnerElement.style.removeProperty("boxShadow");

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
