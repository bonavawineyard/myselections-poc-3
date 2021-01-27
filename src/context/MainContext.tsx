import { createContext, FC, ReactNode, useState } from "react";

interface IMainContext {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isShrunk?: boolean | null;
  setIsShrunk: (isShrunk: boolean) => void;
}

const defaultValues = {
  selectedIndex: -1,
  setSelectedIndex: () => {},
  setIsShrunk: () => {},
};

export const MainContext = createContext<IMainContext>(defaultValues);

export const MainContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isShrunk, setIsShrunk] = useState<boolean | null>();

  return (
    <MainContext.Provider
      value={{ selectedIndex, setSelectedIndex, isShrunk, setIsShrunk }}
    >
      {children}
    </MainContext.Provider>
  );
};
