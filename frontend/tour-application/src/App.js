import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./landing_page/landingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./Register/register";
import Login from "./Login/login";
import RegisterTraveler from "./Register/register_traveler";
import ImageGallery from "./imageGallery";
import About from "./about/about";
import Feedback from "./feedback/feedback";
import BookingMain from "./booking/bookingMain";
import { ToastContainer, toast } from "react-toastify";
import BookNow from "./bookNow/bookNow";
// import ImageCheck from "./imageCheck/imagecheck";
import Package from "./agentPackage/package";
import Itinerary from "./agentPackage/Itinerary";
import ContactDetailsPage from "./agentPackage/contactDetailsPage";
import ContactDetailsForm from "./agentPackage/contactDetailsForm";
import AdminHome from "./adminHome/adminHome";
import Request from "./adminHome/request";
import AdminDashboard from "./adminHome/adminDashboard";
import Status from "./adminHome/status";
import TravelerHome from "./booking/travelerHome";
import AgentHome from "./agentPackage/agentHome";

function App() {
  return (
    <Router>
      {" "}
      {/* Use BrowserRouter here */}
      <Routes>
        {/* <Route exact path="/" element={<Package />} />
        <Route
          path="/contactDetailsForm/:packageId"
          element={<ContactDetailsPage />}
        />
        <Route path="/Itinerary/:packageId" element={<Itinerary />} /> */}
        {/* ------- */}
        {/*<Route path="/success-page" element={<TravelAgentDashBoard />} /> */}
        {/* ------------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="register_traveler" element={<RegisterTraveler />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="bookingMain" element={<BookingMain />} />
        <Route path="/bookNow" element={<BookNow />} />
        {/* <Route path="imagecheck" element={<ImageCheck />} /> */}
        <Route path="package" element={<Package />} />
        <Route
          path="/contactDetailsForm/:packageId"
          element={<ContactDetailsPage />}
        />
        <Route path="/Itinerary/:packageId" element={<Itinerary />} />
        <Route path="contactDetailsPage" element={<ContactDetailsForm />} />

        <Route path="adminhome" element={<AdminHome />} />
        <Route path="request" element={<Request />} />
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route path="status" element={<Status />} />
        <Route path="travelerHome" element={<TravelerHome />} />
        <Route path="agentHome" element={<AgentHome />} />
      </Routes>
    </Router>
  );
}

export default App;
