import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App