import React, { FC, Fragment } from "react";
import { StepRow } from "./StepRow";
import cards from "../fixtures/worktops.json";
import { CardList } from "./CardList";
import { ImageFooterRow } from "./ImageFooterRow";
import { TempText } from "./TempText";
import { MainContextProvider } from "../context/MainContext";
import { RoomPreview } from "./RoomPreview";

const Main: FC = () => (
  <MainContextProvider>
    <Fragment>
      <div className="relative">
        <RoomPreview imageHeight="768px" />
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
    </Fragment>
  </MainContextProvider>
);

export default Main;
