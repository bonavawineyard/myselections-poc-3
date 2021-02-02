import { IBehaviour } from "../interfaces";

const getPercentVisible = (rect: DOMRect) => {
  const { top: outerTop, height: outerHeight } = rect;
  return Math.round(((outerHeight + outerTop) / outerHeight) * 100);
};

const makeElementShrunk = (
  element: HTMLDivElement,
  outerLeft: number,
  outerWidth: number
) => {
  element.style.position = "fixed";
  element.style.top = "0";
  // element.style.left = "0";
  // element.style.right = "0";

  const horizontalPosition =
    document.body.clientWidth - (outerLeft + outerWidth);
  element.style.left = horizontalPosition + "px";
  element.style.right = horizontalPosition + "px";
};

const makeElementNotShrunk = (element: HTMLDivElement) => {
  element.style.removeProperty("position");
  element.style.removeProperty("top");
  element.style.removeProperty("right");
  element.style.height = "100%";
};

const updateInnerContainerElementHeight = (
  outerContainerElement: HTMLDivElement,
  innerContainerElement: HTMLDivElement,
  outerBottom: number,
  minHeightPercent: number
) => {
  if (
    getPercentVisible(outerContainerElement.getBoundingClientRect()) >
    minHeightPercent
  ) {
    innerContainerElement.style.height = outerBottom + "px";
  }
};

export const shrinkOnScroll = ({
  outerContainerElement,
  innerContainerElement,
  shrinkTo,
  minHeightPercent,
  onShrunkChange,
  imageHeight,
  behaviour,
}: {
  outerContainerElement: HTMLDivElement;
  innerContainerElement: HTMLDivElement;
  shrinkTo: string;
  minHeightPercent: number;
  onShrunkChange: (isShrunk: boolean) => void;
  imageHeight: number;
  behaviour: IBehaviour;
}) => {
  const {
    top: outerTop,
    bottom: outerBottom,
    left: outerLeft,
    width: outerWidth,
  } = outerContainerElement.getBoundingClientRect();

  const isShrunk = innerContainerElement.style.position === "fixed";

  // When the container is above viewport - image should shrink
  if (outerTop < 0) {
    if (!isShrunk) {
      if (behaviour === "fixed_size") {
        innerContainerElement.style.maxHeight = `${
          (minHeightPercent / 100) * imageHeight
        }px`;
      }

      makeElementShrunk(innerContainerElement, outerLeft, outerWidth);
      onShrunkChange(isShrunk);
    }

    updateInnerContainerElementHeight(
      outerContainerElement,
      innerContainerElement,
      outerBottom,
      minHeightPercent
    );
  } else if (outerTop > 0 && isShrunk) {
    if (behaviour === "fixed_size") {
      innerContainerElement.style.maxHeight = `${imageHeight}px`;
      if (shrinkTo === "left") {
        makeElementNotShrunk(innerContainerElement);
      } else {
        innerContainerElement.style.position = "absolute";
        innerContainerElement.style.right = "0";
        innerContainerElement.style.left = "0";
      }
    } else if (behaviour === "shrink_on_scroll") {
      makeElementNotShrunk(innerContainerElement);
    }

    onShrunkChange(isShrunk);
  }
};
