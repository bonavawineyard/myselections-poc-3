import { createContext, FC, ReactNode, useState } from "react";
import { IMainContext } from "../interfaces";
import routes from "../fixtures/routes.json";

const defaultValues = {
  selectedIndex: -1,
  setSelectedIndex: () => {},
  setIsShrunk: () => {},
  routes,
  layerImages: [
    {
      src: "/layers/Modern_style_base/Modern_style_base.png",
      type: "base",
    },
  ],
} as IMainContext;

export const MainContext = createContext<IMainContext>(defaultValues);

export const MainContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    defaultValues.selectedIndex
  );
  const [isShrunk, setIsShrunk] = useState<boolean | null>();
  const [shrinkTo, setShrinkTo] = useState<"left" | "right">();
  const [layerImages, setLayerImages] = useState(defaultValues.layerImages);

  return (
    <MainContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        isShrunk,
        setIsShrunk,
        routes: defaultValues.routes,
        shrinkTo,
        setShrinkTo,
        layerImages,
        setLayerImages,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
