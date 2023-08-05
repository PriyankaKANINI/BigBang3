import React from "react";
import "./App.css";
import LandingPage from "./landing_page/landingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./Register/register";
import Login from "./Login/login";
import RegisterTraveler from "./Register/register_traveler";
import ImageGallery from "./imageGallery";
import About from "./about/about";
import Feedback from "./feedback/feedback";
import BookingMain from "./booking/bookingMain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="register_traveler" element={<RegisterTraveler />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="bookingMain" element={<BookingMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
