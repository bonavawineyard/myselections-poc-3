import React, { FC, Fragment } from "react";
import { StepRow } from "./Step/StepRow";
import cards from "../fixtures/worktops.json";
import { CardList } from "./Card/CardList";
import { TempText } from "./TempText";
import { MainContextProvider } from "../context/MainContext";
import { BrowserRouter as Router } from "react-router-dom";
import { MainNav } from "./MainNav";
import { ShrinkExamples } from "./Scroll/ShrinkExamples";
import { ImageFooterRow } from "./ImageFooterRow";
import { Layers } from "./Layers";
import { ICard } from "../interfaces";

const Main: FC = () => (
  <Router>
    <MainContextProvider>
      <Fragment>
        <MainNav />
        <ShrinkExamples>
          <Layers />
          <div className="absolute bottom-0 w-full">
            <ImageFooterRow />
          </div>
        </ShrinkExamples>

        <div>
          <StepRow
            text="Stil: Modern"
            done={true}
            stepNumber="1"
            price="119 900:-"
          />
          <StepRow text="Bänkskiva och stänkskydd" stepNumber="2" open>
            <CardList cards={cards as ICard[]} />
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
      </Fragment>
    </MainContextProvider>
  </Router>
);

export default Main;
