import React, { FC, Fragment, ReactNode, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { ShrinkOnScroll } from "./ShrinkOnScroll";

export const ShrinkExamples: FC<ReactNode> = ({ children }) => {
  const { routes } = useContext(MainContext);

  return (
    <div className="relative">
      <Switch>
        <Route path="/" exact>
          {children}
        </Route>
        <Fragment>
          {routes.map((route, index) => (
            <Route path={route.to} key={`route_${index}`}>
              <ShrinkOnScroll
                imageHeight="768px"
                minHeight={30}
                shrinkTo={route.shrinkTo}
                fixedSize={route.fixedSize}
              >
                {children}
              </ShrinkOnScroll>
            </Route>
          ))}
        </Fragment>
      </Switch>
    </div>
  );
};
