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

const shrinkToMiddleLeft = (element: HTMLDivElement) => {
  element.style.position = "fixed";
  element.style.maxWidth = "200px";
  element.style.marginLeft = "-220px";
  element.style.top = "10%";
};

const shrinkToBottomRight = (element: HTMLDivElement) => {
  element.style.position = "fixed";
  element.style.maxWidth = "200px";
  element.style.marginLeft = "1044px";

  //TODO: temp
  element.style.bottom = "500px";
  setTimeout(() => {
    element.style.bottom = "50px";
  });
};

const expandFromMiddleLeft = (element: HTMLDivElement) => {
  element.style.position = "absolute";
  element.style.maxWidth = "1024px";
  element.style.removeProperty("margin-left");
  element.style.removeProperty("top");
};

const expandFromBottomRight = (element: HTMLDivElement) => {
  element.style.maxWidth = "1024px";
  element.style.marginLeft = "0";
  element.style.position = "absolute";
  element.style.bottom = "0";
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
  const startWhenOuterTop =
    behaviour === "fixed_size_outside" ||
    behaviour === "fixed_size_outside_bottom"
      ? -250
      : 0;

  const isOutsideViewport = outerTop <= startWhenOuterTop;

  if (isOutsideViewport) {
    if (!isShrunk) {
      if (behaviour === "fixed_size") {
        innerContainerElement.style.maxHeight = `${
          (minHeightPercent / 100) * imageHeight
        }px`;
      }

      if (behaviour === "fixed_size" || behaviour === "shrink_on_scroll") {
        makeElementShrunk(innerContainerElement, outerLeft, outerWidth);
      }

      if (behaviour === "fixed_size_outside") {
        shrinkToMiddleLeft(innerContainerElement);
      }

      if (behaviour === "fixed_size_outside_bottom") {
        shrinkToBottomRight(innerContainerElement);
      }

      onShrunkChange(isShrunk);
    }

    if (behaviour === "fixed_size" || behaviour === "shrink_on_scroll") {
      updateInnerContainerElementHeight(
        outerContainerElement,
        innerContainerElement,
        outerBottom,
        minHeightPercent
      );
    }
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
  } else if (outerTop > startWhenOuterTop && isShrunk) {
    if (behaviour === "fixed_size_outside") {
      expandFromMiddleLeft(innerContainerElement);
    } else if (behaviour === "fixed_size_outside_bottom") {
      expandFromBottomRight(innerContainerElement);
    }
    onShrunkChange(isShrunk);
  }
};
