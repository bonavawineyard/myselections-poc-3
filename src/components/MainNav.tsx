import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "../context/MainContext";

export const MainNav = () => {
  const { routes } = useContext(MainContext);

  return (
    <nav className="py-3">
      <ul className="flex gap-8 items-center justify-center">
        <NavLink to="/" exact activeClassName="font-bold">
          Default
        </NavLink>
        {routes.map(({ text, to }, index) => (
          <NavLink key={`navlink_${index}`} to={to} activeClassName="font-bold">
            {text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
