import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const Layers = () => {
  const { shrinkTo, isShrunk, layerImages } = useContext(MainContext);

  const getStyle = (index: number) =>
    index === 0 && isShrunk ? { boxShadow: "0px 0px 5px 1px" } : {};

  console.log(layerImages);

  return (
    <div className="max-h-full h-full relative">
      {layerImages?.map((src, index) => (
        <img
          key={`layer_${index}`}
          src={src}
          alt=""
          style={getStyle(index)}
          className={`max-h-full absolute ${
            shrinkTo === "right" ? "right-0" : ""
          }`}
        />
      ))}
    </div>
  );
};
