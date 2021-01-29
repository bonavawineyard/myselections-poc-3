import React, { FC, Fragment } from "react";
import { TempText } from "./TempText";
import { MainContextProvider } from "../context/MainContext";
import { BrowserRouter as Router } from "react-router-dom";
import { MainNav } from "./MainNav";
import { ShrinkExamples } from "./Scroll/ShrinkExamples";
import { ImageFooterRow } from "./ImageFooterRow";
import { Layers } from "./Layers";
import { Steps } from "./Steps";

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
        <Steps />
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
