import React from "react";
import "./App.css";
import LandingPage from "./landing_page/landingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./Register/register";
import Login from "./Login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* Add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
