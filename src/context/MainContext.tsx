import { createContext, FC, ReactNode, useState } from "react";

interface IRoute {
  text: string;
  to: string;
  shrinkTo?: "left" | "right";
  fixedSize: boolean;
}

interface IMainContext {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isShrunk?: boolean | null;
  setIsShrunk: (isShrunk: boolean) => void;
  routes: IRoute[];
}

const defaultValues = {
  selectedIndex: -1,
  setSelectedIndex: () => {},
  setIsShrunk: () => {},
  routes: [],
};

const routes: IRoute[] = [
  {
    text: "Shrink (left)",
    to: "/shrink-left",
    shrinkTo: "left",
    fixedSize: false,
  },
  {
    text: "Shrink (right)",
    to: "/shrink-right",
    shrinkTo: "right",
    fixedSize: false,
  },
  {
    text: "Fixed shrink (left)",
    to: "/fixed-shrink-left",
    shrinkTo: "left",
    fixedSize: true,
  },
  {
    text: "Fixed shrink (right)",
    to: "/fixed-shrink-right",
    shrinkTo: "right",
    fixedSize: true,
  },
];

export const MainContext = createContext<IMainContext>(defaultValues);

export const MainContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isShrunk, setIsShrunk] = useState<boolean | null>();

  return (
    <MainContext.Provider
      value={{ selectedIndex, setSelectedIndex, isShrunk, setIsShrunk, routes }}
    >
      {children}
    </MainContext.Provider>
  );
};
