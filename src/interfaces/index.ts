import { Dispatch, SetStateAction } from "react";

type ILayerType = "base" | "worktop" | "whitegoods";
type IShrinkTo = "left" | "right";

export interface ICard {
  name: string;
  price: string;
  text: string;
  src: string;
  type: ILayerType;
  selected?: boolean;
  onSelect?: () => void;
}

export interface IIcon {
  type: "check" | "chevronRight" | "chevronDown" | "chevronUp";
}

export interface IRoute {
  text: string;
  to: string;
  icon: string;
  shrinkTo?: IShrinkTo;
  fixedSize: boolean;
}

export interface ILayerImage {
  src: string;
  type: ILayerType;
}

export interface IMainContext {
  activeStep: number;
  isShrunk?: boolean | null;
  layerImages?: ILayerImage[];
  routes: IRoute[];
  selectedIndex: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsShrunk: (isShrunk: boolean) => void;
  setLayerImages: Dispatch<SetStateAction<ILayerImage[] | undefined>>;
  setSelectedIndex: (index: number) => void;
  setShrinkTo?: (shrinkTo: IShrinkTo) => void;
  shrinkTo?: IShrinkTo;
}
