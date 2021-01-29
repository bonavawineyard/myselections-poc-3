import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const Layers = () => {
  const { shrinkTo, isShrunk, layerImages } = useContext(MainContext);
  const getStyle = (isBaseImage: boolean) =>
    isBaseImage && isShrunk ? { boxShadow: "0px 0px 5px 1px" } : {};

  return (
    <div className="max-h-full h-full relative">
      {layerImages?.map((layerImage, index) => (
        <img
          key={`layer_${index}`}
          src={layerImage.src}
          alt=""
          style={getStyle(layerImage.type === "base")}
          className={`max-h-full absolute ${
            shrinkTo === "right" ? "right-0" : ""
          }`}
        />
      ))}
    </div>
  );
};
