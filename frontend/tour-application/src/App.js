import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./landing_page/landingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./Register/register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login/login";
import RegisterTraveler from "./Register/register_traveler";
import ImageGallery from "./imageGallery";
import About from "./about/about";
import Feedback from "./feedback/feedback";
import BookingMain from "./booking/bookingMain";
import { ToastContainer, toast } from "react-toastify";
import BookNow from "./booking/bookNow";
import Package from "./agentPackage/package";
import Itinerary from "./agentPackage/Itinerary";
import ContactDetailsPage from "./agentPackage/contactDetailsPage";
import ContactDetailsForm from "./agentPackage/contactDetailsForm";
import AdminHome from "./adminHome/adminHome";
import Request from "./adminHome/request";
import Status from "./adminHome/status";
import TravelerHome from "./booking/travelerHome";
import AgentHome from "./agentPackage/agentHome";
import AdminHomeProtected from "./protectedRouting/adminHomeProtected";
import RequestProtected from "./protectedRouting/requestProtected";
import StatusProtected from "./protectedRouting/statusProtected";
import FeedbackProtected from "./protectedRouting/feedbackProtected";
import BookingMainProtected from "./protectedRouting/bookingMainProtected";
import BookNowProtected from "./protectedRouting/bookNowProtected";
import TravelerHomeProtected from "./protectedRouting/travelerHomeProtected";
import AgentHomeProtected from "./protectedRouting/agentHomeProtected";
import PackageDetails from "./booking/packageDetails";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Router>
        {" "}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<Register />} />
          <Route path="register_traveler" element={<RegisterTraveler />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route
            path="feedback"
            element={
              <FeedbackProtected token={token}>
                <Feedback />
              </FeedbackProtected>
            }
          />
          <Route
            path="bookingMain"
            element={
              <BookingMainProtected token={token}>
                <BookingMain />
              </BookingMainProtected>
            }
          />

          <Route
            path="travelerHome"
            element={
              <TravelerHomeProtected token={token}>
                <TravelerHome />
              </TravelerHomeProtected>
            }
          />

          <Route
            path="agentHome"
            element={
              <AgentHomeProtected token={token}>
                <AgentHome />
              </AgentHomeProtected>
            }
          />

          <Route
            path="bookNow"
            element={
              <BookNowProtected token={token}>
                <BookNow />
              </BookNowProtected>
            }
          />

          <Route path="/bookNow/:packageId" element={<BookNow />} />

          <Route path="package" element={<Package />} />
          <Route
            path="/contactDetailsForm/:packageId"
            element={<ContactDetailsPage />}
          />
          <Route path="/Itinerary/:packageId" element={<Itinerary />} />
          <Route path="contactDetailsPage" element={<ContactDetailsForm />} />

          <Route path="/" component={<BookingMain />} />
          <Route
            path="/packageDetails/:packageId"
            element={<PackageDetails />}
          />

          <Route
            path="adminhome"
            element={
              <AdminHomeProtected token={token}>
                <AdminHome />
              </AdminHomeProtected>
            }
          />

          <Route
            path="status"
            element={
              <StatusProtected token={token}>
                <Status />
              </StatusProtected>
            }
          />

          <Route
            path="request"
            element={
              <RequestProtected token={token}>
                <Request />
              </RequestProtected>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
