import { Dispatch, SetStateAction } from "react";

type ILayerType = "base" | "worktop" | "whitegoods_fridge" | "whitegoods_micro";
export type IShrinkTo = "left" | "right";
export type IBehaviour =
  | ""
  | "shrink_on_scroll"
  | "fixed_size"
  | "fixed_size_outside"
  | "fixed_size_outside_bottom";

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
  behaviour: IBehaviour;
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
  currentBehaviour: IBehaviour;
  isShrunk?: boolean | null;
  layerImages?: ILayerImage[];
  roomViewWidth: number;
  routes: IRoute[];
  selectedIndex: ISelectedIndex;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setCurrentBehaviour: Dispatch<SetStateAction<IBehaviour>>;
  setIsShrunk: (isShrunk: boolean) => void;
  setLayerImages: Dispatch<SetStateAction<ILayerImage[] | undefined>>;
  setRoomViewWidth: Dispatch<SetStateAction<number>>;
  setSelectedIndex: Dispatch<SetStateAction<ISelectedIndex>>;
  setShrinkTo?: (shrinkTo: IShrinkTo) => void;
  shrinkTo?: IShrinkTo;
}
