import { createContext, FC, useState } from "react";
import { StepRow } from "./StepRow";
import cards from "../fixtures/worktops.json";
import { CardList } from "./CardList";
import { ImageFooterRow } from "./ImageFooterRow";
import { TempText } from "./TempText";

interface IMainContext {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export const MainContext = createContext<IMainContext>({
  selectedIndex: -1,
  setSelectedIndex: () => {},
});

const Main: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <MainContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <div className="relative">
        <img src="/layers/Modern_style_base/Modern_style_base.png" alt="" />
        <div className="absolute bottom-0 w-full">
          <ImageFooterRow />
        </div>
      </div>
      <div>
        <StepRow
          text="Stil: Modern"
          done={true}
          stepNumber="1"
          price="119 900:-"
        />
        <StepRow text="Bänkskiva och stänkskydd" stepNumber="2" open>
          <CardList cards={cards} />
        </StepRow>
        <StepRow text="Uppgradera vitvaror" stepNumber="3" />
      </div>
      <div className="py-4 italic text-xs">
        För att byta golv, gå till{" "}
        <a className="underline" href="/">
          valen som påverkar hela hemmet
        </a>
      </div>
      <TempText />
    </MainContext.Provider>
  );
};

export default Main;
