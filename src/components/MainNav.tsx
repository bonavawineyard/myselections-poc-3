import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "../context/MainContext";

export const MainNav = () => {
  const { routes } = useContext(MainContext);

  return (
    <nav className="py-3">
      <ul className="flex gap-10 items-center justify-center text-xl font-medium">
        <NavLink to="/" exact activeClassName="font-bold">
          Default
        </NavLink>
        {routes.map(({ text, to, icon }, index) => (
          <NavLink
            key={`navlink_${index}`}
            to={to}
            activeClassName="font-bold"
            className="relative mr-5"
          >
            {text}
            <span
              className="font-normal text-2xl absolute bottom-0 text-mint"
              style={{ left: "calc(100% + 0.3rem)" }}
            >
              {icon}
            </span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
