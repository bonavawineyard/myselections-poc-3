import { createContext, FC, ReactNode, useState } from "react";

interface IRoute {
  text: string;
  to: string;
  icon: string;
  shrinkTo?: "left" | "right";
  fixedSize: boolean;
}

interface IMainContext {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isShrunk?: boolean | null;
  setIsShrunk: (isShrunk: boolean) => void;
  routes: IRoute[];
  shrinkTo?: "left" | "right";
  setShrinkTo?: (shrinkTo: "left" | "right") => void;
  layerImages?: string[];
  setLayerImages?: (layerImages: string[]) => void;
}

const defaultValues = {
  selectedIndex: -1,
  setSelectedIndex: () => {},
  setIsShrunk: () => {},
  routes: [],
  layerImages: [
    "/layers/Modern_style_base/Modern_style_base.png",
    "/layers/Modern_style_worktops/Worktop_modern_contrast.png",
  ],
};

const routes: IRoute[] = [
  {
    text: "Shrink",
    icon: "⤡",
    to: "/shrink-left",
    shrinkTo: "left",
    fixedSize: false,
  },
  {
    text: "Shrink",
    icon: "⤢",
    to: "/shrink-right",
    shrinkTo: "right",
    fixedSize: false,
  },
  {
    text: "Fixed size",
    icon: "⤡",
    to: "/fixed-size-left",
    shrinkTo: "left",
    fixedSize: true,
  },
  {
    text: "Fixed size",
    icon: "⤢",
    to: "/fixed-size-right",
    shrinkTo: "right",
    fixedSize: true,
  },
];

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
        routes,
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
