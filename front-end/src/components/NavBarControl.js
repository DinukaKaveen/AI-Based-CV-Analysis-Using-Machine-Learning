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
    location.pathname === "/admin/job_posts" ||
    location.pathname === "/admin/create_job_post"
  ) {
    return <NavBarAdmin />;
  }

  if (
    location.pathname === "/" ||
    location.pathname === "/upload_resume" ||
    location.pathname === "/view_job/:id"
  ) {
    return <NavBarUser />;
  }

  return <div></div>;
}

export default NavBarControl;
