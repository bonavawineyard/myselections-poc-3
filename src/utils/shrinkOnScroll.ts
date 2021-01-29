const getPercentVisible = (rect: DOMRect) => {
  const { top: outerTop, height: outerHeight } = rect;
  return Math.round(((outerHeight + outerTop) / outerHeight) * 100);
};

const makeElementShrunk = (
  imageElement: HTMLDivElement,
  outerLeft: number,
  outerWidth: number
) => {
  imageElement.style.position = "fixed";
  imageElement.style.top = "0";
  // imageElement.style.boxShadow = "0px 0px 5px 1px";

  const horizontalPosition =
    document.body.clientWidth - (outerLeft + outerWidth);
  imageElement.style.left = horizontalPosition + "px";
  imageElement.style.right = horizontalPosition + "px";
};

const makeElementNotShrunk = (imageElement: HTMLDivElement) => {
  imageElement.style.removeProperty("position");
  imageElement.style.removeProperty("top");
  imageElement.style.removeProperty("right");
  // imageElement.style.removeProperty("box-shadow");
  imageElement.style.height = "100%";
};

const updateImageElementHeight = (
  imageOuterElement: HTMLDivElement,
  imageElement: HTMLDivElement,
  outerBottom: number,
  minHeightPercent: number
) => {
  if (
    getPercentVisible(imageOuterElement.getBoundingClientRect()) >
    minHeightPercent
  ) {
    imageElement.style.height = outerBottom + "px";
  }
};

export const shrinkOnScroll = ({
  imageOuterElement,
  imageElement,
  shrinkTo,
  minHeightPercent,
  onShrunkChange,
  fixedSize,
  imageHeight,
}: {
  imageOuterElement: HTMLDivElement;
  imageElement: HTMLDivElement;
  shrinkTo: string;
  minHeightPercent: number;
  onShrunkChange: (isShrunk: boolean) => void;
  fixedSize: boolean;
  imageHeight: number;
}) => {
  const {
    top: outerTop,
    bottom: outerBottom,
    left: outerLeft,
    width: outerWidth,
  } = imageOuterElement.getBoundingClientRect();

  const isShrunk = imageElement.style.position === "fixed";

  // When the image placeholder is above viewport - image should shrink
  if (outerTop < 0) {
    if (!isShrunk) {
      if (fixedSize) {
        imageElement.style.maxHeight = `${
          (minHeightPercent / 100) * imageHeight
        }px`;
      }

      makeElementShrunk(imageElement, outerLeft, outerWidth);
      onShrunkChange(isShrunk);
    }

    updateImageElementHeight(
      imageOuterElement,
      imageElement,
      outerBottom,
      minHeightPercent
    );
  } else if (outerTop > 0 && isShrunk) {
    if (fixedSize) {
      imageElement.style.maxHeight = `${imageHeight}px`;
      if (shrinkTo === "left") {
        makeElementNotShrunk(imageElement);
      } else {
        imageElement.style.position = "absolute";
        imageElement.style.right = "0";
      }
    } else {
      makeElementNotShrunk(imageElement);
    }

    onShrunkChange(isShrunk);
  }
};
