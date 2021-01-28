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
  outerBottom: number
) => {
  if (getPercentVisible(imageOuterElement.getBoundingClientRect()) > 30) {
    imageElement.style.height = outerBottom + "px";
  }
};

export const shrinkOnScroll = (
  imageOuterElement: HTMLDivElement,
  imageInnerElement: HTMLImageElement,
  shrinkTo: string,
  onShrunkChange: (isShrunk: boolean) => void
) => {
  const {
    top: outerTop,
    bottom: outerBottom,
    left: outerLeft,
    width: outerWidth,
  } = imageOuterElement.getBoundingClientRect();

  const isShrunk = imageInnerElement.style.position === "fixed";

  // When the image placeholder is above viewport - image should shrink
  if (outerTop < 0) {
    if (!isShrunk) {
      makeElementShrunk(imageInnerElement, outerLeft, outerWidth, shrinkTo);
      onShrunkChange(isShrunk);
    }

    updateImageElementHeight(imageOuterElement, imageInnerElement, outerBottom);
  } else if (outerTop > 0 && isShrunk) {
    makeElementNotShrunk(imageInnerElement);
    onShrunkChange(isShrunk);
  }
};
