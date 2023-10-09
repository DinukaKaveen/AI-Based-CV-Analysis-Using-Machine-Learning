import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarControl from "./components/NavBarControl";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AdminUploadResume from "./components/AdminUploadResume";
import AdminRegister from "./components/AdminRegister";
import AdminDetails from "./components/AdminDetails";
import UserHome from "./components/UserHome";
import UserUploadResume from "./components/UserUploadResume";

function App() {

  return (
    <BrowserRouter>
      <div>
        <NavBarControl />
        <Routes>
          <Route path="/home" exact element={<UserHome />}></Route>
          <Route path="/upload_resume" exact element={<UserUploadResume />}></Route>

          <Route path="/admin" exact element={<AdminLogin />}></Route>
          <Route path="/admin/register" exact element={<AdminRegister />}></Route>
          <Route path="/admin/admin_details" exact element={<AdminDetails />}></Route>
          <Route path="/admin/home" exact element={<AdminHome />}></Route>
          <Route path="/admin/upload_resume" exact element={<AdminUploadResume />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
