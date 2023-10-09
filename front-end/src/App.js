import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarControl from "./components/NavBarControl";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AdminUploadResume from "./components/AdminUploadResume";
import Register from "./components/Register";

function App() {

  return (
    <BrowserRouter>
      <div>
        <NavBarControl />
        <Routes>
          <Route path="/admin" exact element={<AdminLogin />}></Route>
          <Route path="/admin/home" exact element={<AdminHome />}></Route>
          <Route path="/admin/upload_resume" exact element={<AdminUploadResume />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
