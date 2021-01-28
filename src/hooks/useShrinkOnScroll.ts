import { MutableRefObject, useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { fixedShrinkOnScroll, shrinkOnScroll } from "../utils/shrinkOnScroll";

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
  shrinkTo: string;
  imageHeight: string;
  fixedSize: boolean;
  minHeight: number;
}) => {
  const { setIsShrunk } = useContext(MainContext);

  useEffect(() => {
    const imageElement = imageRef.current as HTMLDivElement;
    const imageOuterElement = imageOuterRef.current as HTMLDivElement;

    const handleScroll = () => {
      const toggleShrunkState = (isShrunk: boolean) => {
        setIsShrunk(!isShrunk);
      };

      if (fixedSize) {
        imageElement.style.transition = "all 0.3s";

        fixedShrinkOnScroll({
          imageOuterElement,
          imageElement,
          shrinkTo,
          imageHeight,
          onShrunkChange: toggleShrunkState,
        });
      } else {
        shrinkOnScroll({
          imageOuterElement,
          imageElement,
          shrinkTo,
          minHeightPercent: minHeight,
          onShrunkChange: toggleShrunkState,
        });
      }
    };

    if (fixedSize) {
      imageElement.style.maxHeight = imageHeight;
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
