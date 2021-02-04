import React, { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MainNavRadio } from "./MainNavRadio";
export const MainNav = () => {
  const location = useLocation();

  const newRoutes = [
    {
      title: "Shrink on scroll",
      routes: [
        { title: "Left", path: "/shrink-left" },
        { title: "Right", path: "/shrink-right" },
      ],
    },
    {
      title: "Shrink to fixed size",
      routes: [
        { title: "Left", path: "/fixed-size-left" },
        { title: "Right", path: "/fixed-size-right" },
      ],
    },
    {
      title: "Shrink outside of content",
      routes: [
        { title: "Left", path: "/fixed-outside-left" },
        { title: "Right", path: "/fixed-outside-right" },
      ],
    },
  ];

  return (
    <nav className="pt-3 pb-10 h-40">
      <ul className="flex gap-10 items-start justify-center text-xl font-medium">
        <li>
          <NavLink to="/" exact>
            Default
          </NavLink>
        </li>
        {newRoutes.map((route, index) => (
          <Fragment key={`route_${index}`}>
            <li>|</li>
            <li>
              <NavLink to={route.routes[0].path}>{route.title}</NavLink>
              {route.routes.some(
                (childRoute) => childRoute.path === location.pathname
              ) && (
                <div className="text-base text-center">
                  {route.routes.map((childRoute, index) => (
                    <MainNavRadio
                      key={`childroute_${index}`}
                      path={childRoute.path}
                      text={childRoute.title}
                    />
                  ))}
                </div>
              )}
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};
