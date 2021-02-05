import { createContext, FC, ReactNode, useState } from "react";
import { IMainContext, IShrinkTo } from "../interfaces";
import routes from "../fixtures/routes.json";

const defaultValues = {
  activeStep: 1,
  currentBehaviour: "",
  layerImages: [
    {
      src: "/layers/Modern_style_base/Modern_style_base.png",
      type: "base",
    },
  ],
  roomViewWidth: 500,
  routes,
  selectedIndex: {
    whitegoods_fridge: -1,
    whitegoods_micro: -1,
    worktop: -1,
  },
  setActiveStep: () => {},
  setCurrentBehaviour: () => {},
  setIsShrunk: () => {},
  setLayerImages: () => {},
  setRoomViewWidth: () => {},
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
  const [currentBehaviour, setCurrentBehaviour] = useState(
    defaultValues.currentBehaviour
  );
  const [roomViewWidth, setRoomViewWidth] = useState(
    defaultValues.roomViewWidth
  );

  return (
    <MainContext.Provider
      value={{
        activeStep,
        currentBehaviour,
        isShrunk,
        layerImages,
        roomViewWidth,
        routes: defaultValues.routes,
        selectedIndex,
        setActiveStep,
        setCurrentBehaviour,
        setIsShrunk,
        setLayerImages,
        setRoomViewWidth,
        setSelectedIndex,
        setShrinkTo,
        shrinkTo,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
