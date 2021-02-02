import { MutableRefObject, useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { shrinkOnScroll } from "../utils/shrinkOnScroll";

export const useShrinkOnScroll = ({
  innerContainerRef,
  outerContainerRef,
  shrinkTo,
  imageHeight,
  fixedSize,
  minHeight,
}: {
  innerContainerRef: MutableRefObject<HTMLDivElement | null>;
  outerContainerRef: MutableRefObject<HTMLDivElement | null>;
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
    const innerContainerElement = innerContainerRef.current as HTMLDivElement;
    const outerContainerElement = outerContainerRef.current as HTMLDivElement;

    const handleScroll = () => {
      const toggleShrunkState = (isShrunk: boolean) => {
        setIsShrunk(!isShrunk);
      };

      if (fixedSize) {
        innerContainerElement.style.transition = "max-height 0.3s";
      }

      shrinkOnScroll({
        outerContainerElement,
        innerContainerElement,
        shrinkTo,
        minHeightPercent: minHeight,
        onShrunkChange: toggleShrunkState,
        fixedSize,
        imageHeight,
      });
    };

    if (fixedSize) {
      innerContainerElement.style.maxHeight = `${imageHeight}px`;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    fixedSize,
    imageHeight,
    outerContainerRef,
    innerContainerRef,
    minHeight,
    setIsShrunk,
    shrinkTo,
  ]);
};
