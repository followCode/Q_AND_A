import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/homePage";
import Login from "./views/login/loginPage";
import Register from "./views/register/registerPage";
import Dashboard from "./views/dashboard/dashboard";
import QuestionView from './views/question/question';
import LogoutView from './views/logout/logout';

function App() {
  return (
    <Router>
      <div className="">
          <Routes>
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Dashboard/>} path="/dashboard" />
            <Route element={<Home/>} path="/" />
            <Route element={<LogoutView/>} path="/logout" />
            <Route element={<QuestionView/>} path="/question/:id"/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
