import React, { Fragment, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { MainNavRadio } from "./MainNavRadio";

interface IRoute {
  title: string;
  path: string;
  routes: IRoute[];
}

const newRoutes = [
  {
    title: "Shrink on scroll",
    path: "",
    routes: [
      { title: "Left", path: "/shrink-left" },
      { title: "Right", path: "/shrink-right" },
    ],
  },
  {
    title: "Shrink to fixed size",
    path: "",
    routes: [
      { title: "Left", path: "/fixed-size-left" },
      { title: "Right", path: "/fixed-size-right" },
    ],
  },
  {
    title: "Shrink outside of content",
    path: "/fixed-outside-left",
    routes: [
      { title: "Left", path: "/fixed-outside-left" },
      { title: "Right", path: "/fixed-outside-right" },
    ],
  },
] as IRoute[];

export const MainNav = () => {
  const { roomViewWidth, setRoomViewWidth } = useContext(MainContext);
  const location = useLocation();

  const hasChildRoutes = (routes: IRoute[]) =>
    routes.some((childRoute) => childRoute.path === location.pathname);

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
              {hasChildRoutes(route.routes) && (
                <div className="text-base text-center">
                  {route.routes.map((childRoute, index) => (
                    <MainNavRadio
                      key={`childroute_${index}`}
                      path={childRoute.path}
                      text={childRoute.title}
                    />
                  ))}
                  {route.path === "/fixed-outside-left" && (
                    <div>
                      <label>
                        <span>Width:</span>
                        <input
                          type="text"
                          className="border w-16 ml-2 px-2"
                          value={roomViewWidth}
                          onChange={(e) =>
                            setRoomViewWidth(Number(e.target.value))
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};
