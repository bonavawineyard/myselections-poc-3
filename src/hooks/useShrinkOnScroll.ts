import { MutableRefObject, useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { shrinkOnScroll } from "../utils/shrinkOnScroll";

export const useShrinkOnScroll = ({
  imageRef,
  imageOuterRef,
  shrinkTo,
  imageHeight,
  fixedSize,
  minHeight,
}: {
  imageRef: MutableRefObject<HTMLDivElement | null>;
  imageOuterRef: MutableRefObject<HTMLDivElement | null>;
  shrinkTo: "left" | "right";
  imageHeight: number;
  fixedSize: boolean;
  minHeight: number;
}) => {
  const { setIsShrunk, setShrinkTo } = useContext(MainContext);

  useEffect(() => {
    if (setShrinkTo) {
      setShrinkTo(shrinkTo);
    }
  }, [setShrinkTo, shrinkTo]);

  useEffect(() => {
    const imageElement = imageRef.current as HTMLDivElement;
    const imageOuterElement = imageOuterRef.current as HTMLDivElement;

    const handleScroll = () => {
      const toggleShrunkState = (isShrunk: boolean) => {
        setIsShrunk(!isShrunk);
      };

      if (fixedSize) {
        imageElement.style.transition = "all 0.3s";
      }

      shrinkOnScroll({
        imageOuterElement,
        imageElement,
        shrinkTo,
        minHeightPercent: minHeight,
        onShrunkChange: toggleShrunkState,
        fixedSize,
        imageHeight,
      });
    };

    if (fixedSize) {
      imageElement.style.maxHeight = `${imageHeight}px`;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    fixedSize,
    imageHeight,
    imageOuterRef,
    imageRef,
    minHeight,
    setIsShrunk,
    shrinkTo,
  ]);
};
