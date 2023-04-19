// ThemeToggle.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeReducer";

const ThemeToggle = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div>
      <button onClick={handleToggleTheme}>
        {isDarkTheme ? "Light" : "Dark"} Theme
      </button>
    </div>
  );
};

export default ThemeToggle;
