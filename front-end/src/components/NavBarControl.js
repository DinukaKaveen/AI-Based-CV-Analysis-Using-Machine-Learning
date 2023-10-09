import React from "react";
import { useLocation } from "react-router-dom";
import NavBarAdmin from "./NavBarAdmin";

function NavBarControl() {
  const location = useLocation();

  if (location.pathname === "/home" || location.pathname === "/upload_resume") {
    return <NavBarAdmin />;
  }

  return <div></div>;
}

export default NavBarControl;
