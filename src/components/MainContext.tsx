import { createContext } from "react";

interface IMainContext {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isShrunk: boolean;
  setIsShrunk: (isShrunk: boolean) => void;
}

export const MainContext = createContext<IMainContext>({
  selectedIndex: -1,
  setSelectedIndex: () => {},
  isShrunk: false,
  setIsShrunk: () => {},
});
