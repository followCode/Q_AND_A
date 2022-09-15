import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/homePage";
import Login from "./views/login/loginPage";
import Register from "./views/register/registerPage";

function App() {
  return (
    <Router>
      <div className="">
          <Routes>
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Home/>} path="/" />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
