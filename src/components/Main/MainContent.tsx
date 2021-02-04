import React, { FC, ReactNode, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { ShrinkOnScroll } from "../Scroll/ShrinkOnScroll";

export const MainContent: FC<ReactNode> = ({ children }) => {
  const { routes } = useContext(MainContext);

  return (
    <div className="relative">
      <Switch>
        <Route path="/" exact>
          <div style={{ height: "768px" }}>{children}</div>
        </Route>
        {routes.map((route, index) => (
          <Route path={route.to} key={`route_${index}`}>
            <ShrinkOnScroll
              imageHeight={768}
              minHeight={30}
              shrinkTo={route.shrinkTo}
              behaviour={route.behaviour}
            >
              {children}
            </ShrinkOnScroll>
          </Route>
        ))}
      </Switch>
    </div>
  );
};
