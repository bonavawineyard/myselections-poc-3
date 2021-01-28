import React, { FC, Fragment } from "react";
import { StepRow } from "./StepRow";
import cards from "../fixtures/worktops.json";
import { CardList } from "./CardList";
import { ImageFooterRow } from "./ImageFooterRow";
import { TempText } from "./TempText";
import { MainContextProvider } from "../context/MainContext";
import { ShrinkOnScroll } from "./ShrinkOnScroll";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const Main: FC = () => {
  const navItems = [
    { text: "None", to: "/" },
    { text: "Shrink (left)", to: "/shrink-left" },
    { text: "Shrink (right)", to: "/shrink-right" },
  ];

  return (
    <Router>
      <MainContextProvider>
        <Fragment>
          <nav className="py-2">
            <ul className="flex gap-8">
              {navItems.map(({ text, to }, index) => (
                <NavLink
                  key={`navlink_${index}`}
                  to={to}
                  exact
                  activeClassName="font-bold"
                >
                  {text}
                </NavLink>
              ))}
            </ul>
          </nav>

          <div className="relative">
            <Switch>
              <Route path="/shrink-left">
                <ShrinkOnScroll
                  imageHeight="768px"
                  src="/layers/Modern_style_base/Modern_style_base.png"
                />
                <div className="absolute bottom-0 w-full">
                  <ImageFooterRow />
                </div>
              </Route>
              <Route path="/shrink-right">
                <ShrinkOnScroll
                  imageHeight="768px"
                  shrinkTo="right"
                  src="/layers/Modern_style_base/Modern_style_base.png"
                />
                <div className="absolute bottom-0 w-full">
                  <ImageFooterRow />
                </div>
              </Route>
            </Switch>
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
    </Router>
  );
};

export default Main;
