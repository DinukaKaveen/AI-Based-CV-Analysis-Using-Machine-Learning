import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarControl from "./components/NavBarControl";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AdminRegister from "./components/AdminRegister";
import AdminDetails from "./components/AdminDetails";
import UserHome from "./components/UserHome";
import UserLogin from "./components/UserLogin";
import AdminJobPosts from "./components/AdminJobPosts";
import AdminCreateJobPost from "./components/AdminCreateJobPost";
import UserViewJob from "./components/UserViewJob";
import AdminJobCandidates from "./components/AdminJobCandidates";

function App() {

  return (
    <BrowserRouter>
      <div>
        <NavBarControl />
        <Routes>
          <Route path="/" exact element={<UserHome />}></Route>
          <Route path="/login" exact element={<UserLogin />}></Route>
          <Route path="/view_job/:id" exact element={<UserViewJob />}></Route>

          <Route path="/admin" exact element={<AdminLogin />}></Route>
          <Route path="/admin/register" exact element={<AdminRegister />}></Route>
          <Route path="/admin/admin_details" exact element={<AdminDetails />}></Route>
          <Route path="/admin/home" exact element={<AdminHome />}></Route>
          <Route path="/admin/job_posts" exact element={<AdminJobPosts />}></Route>
          <Route path="/admin/create_job_post" exact element={<AdminCreateJobPost />}></Route>
          <Route path="/admin/applied_candidates" exact element={<AdminJobCandidates />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
