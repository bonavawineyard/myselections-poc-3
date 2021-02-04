import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

export const RoomView = () => {
  const { shrinkTo, isShrunk, layerImages, currentBehaviour } = useContext(
    MainContext
  );
  const getStyle = (isBaseImage: boolean) =>
    isBaseImage && isShrunk ? { boxShadow: "0px 0px 5px 1px" } : {};

  const getClassName = (index: number) =>
    currentBehaviour === "fixed_size_outside" ||
    currentBehaviour === "fixed_size_outside_bottom"
      ? `${index > 0 ? "absolute top-0" : ""}`
      : `max-h-full absolute ${shrinkTo === "right" ? "right-0" : ""}`;

  return (
    <div className="max-h-full h-full relative">
      {layerImages?.map((layerImage, index) => (
        <img
          key={`layer_${index}`}
          src={layerImage.src}
          alt=""
          style={getStyle(layerImage.type === "base")}
          className={getClassName(index)}
        />
      ))}
    </div>
  );
};
