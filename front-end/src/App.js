import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarControl from "./components/NavBarControl";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UploadResume from "./components/UploadResume";

function App() {

  return (
    <BrowserRouter>
      <div>
        <NavBarControl />
        <Routes>
          <Route path="/admin" exact element={<Login />}></Route>
          <Route path="/admin/home" exact element={<Home />}></Route>
          <Route path="/admin/upload_resume" exact element={<UploadResume />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
