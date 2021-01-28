const getPercentVisible = (rect: DOMRect) => {
  const { top: outerTop, height: outerHeight } = rect;
  return Math.round(((outerHeight + outerTop) / outerHeight) * 100);
};

const makeElementShrunk = (
  imageElement: HTMLImageElement,
  outerLeft: number,
  outerWidth: number,
  shrinkTo: string
) => {
  imageElement.style.position = "fixed";
  imageElement.style.top = "0";
  imageElement.style.boxShadow = "0px 0px 5px 1px";

  if (shrinkTo === "right") {
    const rightPosition = document.body.clientWidth - (outerLeft + outerWidth);
    imageElement.style.right = rightPosition + "px";
  }
};

const makeElementNotShrunk = (imageElement: HTMLImageElement) => {
  imageElement.style.removeProperty("position");
  imageElement.style.removeProperty("top");
  imageElement.style.removeProperty("right");
  imageElement.style.removeProperty("box-shadow");
  imageElement.style.height = "100%";
};

const updateImageElementHeight = (
  imageOuterElement: HTMLDivElement,
  imageElement: HTMLImageElement,
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
}: {
  imageOuterElement: HTMLDivElement;
  imageElement: HTMLImageElement;
  shrinkTo: string;
  minHeightPercent: number;
  onShrunkChange: (isShrunk: boolean) => void;
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
      makeElementShrunk(imageElement, outerLeft, outerWidth, shrinkTo);
      onShrunkChange(isShrunk);
    }

    updateImageElementHeight(
      imageOuterElement,
      imageElement,
      outerBottom,
      minHeightPercent
    );
  } else if (outerTop > 0 && isShrunk) {
    makeElementNotShrunk(imageElement);
    onShrunkChange(isShrunk);
  }
};

export const fixedShrinkOnScroll = ({
  imageOuterElement,
  imageElement,
  shrinkTo,
  imageHeight,
  onShrunkChange,
}: {
  imageOuterElement: HTMLDivElement;
  imageElement: HTMLImageElement;
  shrinkTo: string;
  imageHeight: string;
  onShrunkChange: (isShrunk: boolean) => void;
}) => {
  const {
    top: outerTop,
    left: outerLeft,
    width: outerWidth,
  } = imageOuterElement.getBoundingClientRect();

  const isShrunk = imageElement.style.position === "fixed";

  // When the image placeholder is above viewport - image should shrink
  if (outerTop < 0) {
    if (!isShrunk) {
      makeElementShrunk(imageElement, outerLeft, outerWidth, shrinkTo);
      imageElement.style.maxHeight = "200px";

      onShrunkChange(isShrunk);
    }
  } else if (outerTop > 0 && isShrunk) {
    imageElement.style.maxHeight = imageHeight;
    if (shrinkTo === "left") {
      makeElementNotShrunk(imageElement);
    } else {
      imageElement.style.position = "absolute";
      imageElement.style.right = "0";
    }
    onShrunkChange(isShrunk);
  }
};
