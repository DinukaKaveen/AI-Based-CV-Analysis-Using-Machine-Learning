import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

function NavBarControl() {
  const location = useLocation();

  if (location.pathname === "/home" || location.pathname === "/upload_resume") {
    return <NavBar />;
  }

  return <div></div>;
}

export default NavBarControl;
