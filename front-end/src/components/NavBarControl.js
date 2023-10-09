import React from "react";
import { useLocation } from "react-router-dom";
import NavBarAdmin from "./NavBarAdmin";
import NavBarUser from "./NavBarUser";

function NavBarControl() {
  const location = useLocation();

  if (
    location.pathname === "/admin/home" ||
    location.pathname === "/admin/register" ||
    location.pathname === "/admin/admin_details" ||
    location.pathname === "/admin/upload_resume"
  ) {
    return <NavBarAdmin />;
  }

  if (
    location.pathname === "/home"
  ) {
    return <NavBarUser />;
  }

  return <div></div>;
}

export default NavBarControl;
