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
  isShrunk?: boolean | null;
  layerImages?: ILayerImage[];
  routes: IRoute[];
  selectedIndex: number;
  setIsShrunk: (isShrunk: boolean) => void;
  setLayerImages?: (layerImages: ILayerImage[]) => void;
  setSelectedIndex: (index: number) => void;
  setShrinkTo?: (shrinkTo: IShrinkTo) => void;
  shrinkTo?: IShrinkTo;
}
