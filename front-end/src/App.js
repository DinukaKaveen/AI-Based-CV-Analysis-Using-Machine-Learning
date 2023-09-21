import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarControl from "./components/NavBarControl";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {

  return (
    <BrowserRouter>
      <div>
        <NavBarControl />
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
