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
    location.pathname === "/admin/create_job_post" ||
    location.pathname === "/admin/applied_candidates"
  ) {
    return <NavBarAdmin />;
  }

  if (
    location.pathname === "/" ||
    location.pathname.startsWith("/view_job/") // Check if it starts with "/view_job/"
  ) {
    const id = location.pathname.replace("/view_job/", ""); // Extract the ID
    return <NavBarUser id={id} />; // Pass the ID to your NavBarUser component
  }

  return null; // Return null or any other component if none of the conditions match

  
}

export default NavBarControl;
