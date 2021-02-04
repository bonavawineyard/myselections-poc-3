import React, { FC, Fragment } from "react";
import { TempText } from "../Misc/TempText";
import { MainContextProvider } from "../../context/MainContext";
import { BrowserRouter as Router } from "react-router-dom";
import { MainNav } from "./MainNav";
import { MainContent } from "./MainContent";
import { RoomViewFooter } from "../RoomView/RoomViewFooter";
import { RoomView } from "../RoomView/RoomView";
import { StepList } from "../Step/StepList";

const Main: FC = () => (
  <Router>
    <MainContextProvider>
      <Fragment>
        <MainNav />
        <MainContent>
          <RoomView />
          <div className="absolute bottom-0 w-full">
            <RoomViewFooter />
          </div>
        </MainContent>
        <StepList />
        <div className="py-4 italic text-xs">
          För att byta golv, gå till{" "}
          <a className="underline" href="/">
            valen som påverkar hela hemmet
          </a>
        </div>
        <div className="mt-80">
          <TempText />
        </div>
      </Fragment>
    </MainContextProvider>
  </Router>
);

export default Main;
