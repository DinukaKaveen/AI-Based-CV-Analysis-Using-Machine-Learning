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

  if(
    location.pathname.startsWith("/admin/applied_candidates/") 
  ){
    const id = location.pathname.replace("/admin/applied_candidates/", ""); 
    return <NavBarAdmin id={id} />;
  }

  if(
    location.pathname.startsWith("/admin/edit_job_post/")
  ){
    const id = location.pathname.replace("/admin/edit_job_post/", ""); 
    return <NavBarAdmin id={id} />;
  }

//******************************************************************************************************************

  if (
    location.pathname === "/" ||
    location.pathname === "/register"
  ) {
    return <NavBarUser />; 
  }

  if(
    location.pathname.startsWith("/view_job/")
  ){
    const id = location.pathname.replace("/view_job/", ""); 
    return <NavBarUser id={id} />;
  }


  return null; // Return null or any other component if none of the conditions match

  
}

export default NavBarControl;
