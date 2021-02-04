import { MutableRefObject, useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { IBehaviour, IShrinkTo } from "../interfaces";
import { shrinkOnScroll } from "../utils/shrinkOnScroll";

export const useShrinkOnScroll = ({
  innerContainerRef,
  outerContainerRef,
  shrinkTo,
  imageHeight,
  minHeight,
  behaviour,
}: {
  innerContainerRef: MutableRefObject<HTMLDivElement | null>;
  outerContainerRef: MutableRefObject<HTMLDivElement | null>;
  shrinkTo: IShrinkTo;
  imageHeight: number;
  minHeight: number;
  behaviour: IBehaviour;
}) => {
  const { setIsShrunk, setShrinkTo, setCurrentBehaviour } = useContext(
    MainContext
  );

  useEffect(() => {
    setCurrentBehaviour(behaviour);
  }, [behaviour, setCurrentBehaviour]);

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

      if (behaviour === "fixed_size") {
        innerContainerElement.style.transition = "max-height 0.3s";
      }

      shrinkOnScroll({
        outerContainerElement,
        innerContainerElement,
        shrinkTo,
        minHeightPercent: minHeight,
        onShrunkChange: toggleShrunkState,
        imageHeight,
        behaviour,
      });
    };

    if (behaviour === "fixed_size") {
      innerContainerElement.style.maxHeight = `${imageHeight}px`;
    }

    if (behaviour === "fixed_size_outside") {
      innerContainerElement.ontransitionend = () => {
        if (innerContainerElement.style.position === "absolute") {
          innerContainerElement.style.removeProperty("position");
        }
      };
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    imageHeight,
    outerContainerRef,
    innerContainerRef,
    minHeight,
    setIsShrunk,
    shrinkTo,
    behaviour,
  ]);
};
