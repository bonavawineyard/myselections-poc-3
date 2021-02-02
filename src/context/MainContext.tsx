import { createContext, FC, ReactNode, useState } from "react";
import { IMainContext, IShrinkTo } from "../interfaces";
import routes from "../fixtures/routes.json";

const defaultValues = {
  activeStep: 1,
  layerImages: [
    {
      src: "/layers/Modern_style_base/Modern_style_base.png",
      type: "base",
    },
  ],
  routes,
  selectedIndex: {
    whitegoods_fridge: -1,
    whitegoods_micro: -1,
    worktop: -1,
  },
  setActiveStep: () => {},
  setIsShrunk: () => {},
  setLayerImages: () => {},
  setSelectedIndex: () => {},
} as IMainContext;

export const MainContext = createContext<IMainContext>(defaultValues);

export const MainContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    defaultValues.selectedIndex
  );
  const [isShrunk, setIsShrunk] = useState<boolean | null>();
  const [shrinkTo, setShrinkTo] = useState<IShrinkTo>();
  const [layerImages, setLayerImages] = useState(defaultValues.layerImages);
  const [activeStep, setActiveStep] = useState(defaultValues.activeStep);

  return (
    <MainContext.Provider
      value={{
        activeStep,
        isShrunk,
        layerImages,
        routes: defaultValues.routes,
        selectedIndex,
        setActiveStep,
        setIsShrunk,
        setLayerImages,
        setSelectedIndex,
        setShrinkTo,
        shrinkTo,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
