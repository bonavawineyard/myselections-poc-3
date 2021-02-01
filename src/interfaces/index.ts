import { Dispatch, SetStateAction } from "react";

type ILayerType = "base" | "worktop" | "whitegoods_fridge" | "whitegoods_micro";
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

export interface ISelectedIndex {
  base?: number;
  whitegoods_fridge: number;
  whitegoods_micro: number;
  worktop: number;
}

export interface IMainContext {
  activeStep: number;
  isShrunk?: boolean | null;
  layerImages?: ILayerImage[];
  routes: IRoute[];
  selectedIndex: ISelectedIndex;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsShrunk: (isShrunk: boolean) => void;
  setLayerImages: Dispatch<SetStateAction<ILayerImage[] | undefined>>;
  setSelectedIndex: Dispatch<SetStateAction<ISelectedIndex>>;
  setShrinkTo?: (shrinkTo: IShrinkTo) => void;
  shrinkTo?: IShrinkTo;
}
