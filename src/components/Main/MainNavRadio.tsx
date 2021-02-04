import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const MainNavRadio: FC<{ path: string; text: string }> = ({
  path,
  text,
}) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <label className="px-1">
      <input
        type="radio"
        name="shrink_on_scroll"
        checked={location.pathname === path}
        onChange={() => history.push(path)}
      />
      <span className="pl-0.5">{text}</span>
    </label>
  );
};
