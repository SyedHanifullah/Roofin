import React from "react";
import { Outlet } from "react-router-dom";

const Public = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <Outlet />
    </React.Fragment>
  );
};

export default Public;
