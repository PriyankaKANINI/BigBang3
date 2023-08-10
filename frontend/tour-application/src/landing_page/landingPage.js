import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";
import "../landing_page/landingPage.css";
import Register from "../Register/register";
import { toast } from "react-toastify";
import RegisterTraveler from "../Register/register_traveler";
import imageSrc1 from "../images/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand.jpg";
import imageSrc2 from "../images/young-woman-hiker-taking-photo-with-smartphone-mountains-peak-winter.jpg";
import imageSrc3 from "../images/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand.jpg";
import imageSrc4 from "../images/couple-together-kayaking-river.jpg";
import imageSrc5 from "../images/couple-tourists-with-backpacks-mountain.jpg";
import imageSrc6 from "../images/woman-walking-big-entrance-gate-bali-indonesia.jpg";
import imageSrc7 from "../images/photographer-hand-holding-camera-standing-viewpoint-clouds-panorama-viewpoint-sunrise.jpg";
import About from "../about/about";
import "bootstrap-icons/font/bootstrap-icons.css";
import Feedback from "../feedback/feedback";
import BookingMain from "../booking/bookingMain";
import { colors } from "@mui/material";

const LandingPage = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const handleNavLinkClick = (sectionId) => {
    scroll.scrollTo(sectionId, {
      smooth: true,
      offset: -80,
    });
  };
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole) {
      toast.info("You are already logged out.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      localStorage.clear();
      toast.success("Successfully Logged Out", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    navigate("landingPage");
  };

  const [images, setImages] = useState([]);
  const apiBaseUrl = "http://localhost:5234/api/TourImage";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(apiBaseUrl);
        console.log(response.data);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Travel Co.
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {userRole === "Admin" && (
                <li className="nav-item">
                  <Link to="adminhome" className="nav-link">
                    Admin
                  </Link>
                </li>
              )}
              {userRole === "Agent" && (
                <li className="nav-item">
                  <Link to="package" className="nav-link">
                    Package
                  </Link>
                </li>
              )}
              {userRole === "Traveler" && (
                <li className="nav-item">
                  <Link to="bookingMain" className="nav-link">
                    Book Now
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="#footer-section" className="nav-link">
                  Contact Us
                </Link>
              </li>
              <li className="nav-tem dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="register" className="dropdown-item">
                      Register as Agent
                    </Link>
                  </li>
                  <li>
                    <Link to="register_traveler" className="dropdown-item">
                      Register as Traveler
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-tem dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="about" className="dropdown-item">
                      About Us
                    </Link>
                  </li>
                  <li
                    id="nav-item-logout-color"
                    className="nav-item-logout"
                    style={{ color: "black !important" }}
                  >
                    <Link to="/" className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* section-1 */}
      <section className="hero-section-container">
        <div className="hero-section-title">
          <h2>Explore the Beauty of the Beautiful World</h2>
          <div className="hero-title-button">
            <button className="explore-now">explore now</button>
            <button className="explore-now-login">
              <Link to="login" className="nav-link">
                Sign-In/Login
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* section-3 */}
      <section id="gallery" class="gallery">
        <div class="container">
          <div class="gallery-details">
            <div class="gallary-header text-center">
              <h2>Top Destinations</h2>
              <p>
                Duis aute irure dolor in velit esse cillum dolore eu fugiat
                nulla.
              </p>
            </div>
            <div class="gallery-box">
              {/* <!-- For gallery-container-1 --> */}
              <div class="gallery-container-1">
                <div class="gallery-item item-large">
                  <img src={imageSrc1} alt="China" />
                  <div class="item-title">
                    <a href="#">China</a>
                    <p>
                      <span>20 tours</span>
                      <span>15 places</span>
                    </p>
                  </div>
                </div>
                <div class="gallery-item item-medium">
                  <img src={imageSrc2} alt="Venezuela" />
                  <div class="item-title">
                    <a href="#">Venezuela</a>
                    <p>
                      <span>12 tours</span>
                      <span>9 places</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- For gallery-container-2 --> */}
              <div class="gallery-container-2">
                <div class="gallery-item item-large">
                  <img src={imageSrc3} alt="Brazil" />
                  <div class="item-title">
                    <a href="#">Brazil</a>
                    <p>
                      <span>25 tours</span>
                      <span>10 places</span>
                    </p>
                  </div>
                </div>
                <div class="gallery-item item-medium">
                  <img src={imageSrc4} alt="Australia" />
                  <div class="item-title">
                    <a href="#">Australia</a>
                    <p>
                      <span>18 tours</span>
                      <span>9 places</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- For gallery-container-3 --> */}
              <div class="gallery-container-3">
                <div class="gallery-item item-large">
                  <img src={imageSrc6} alt="Thailand" />
                  <div class="item-title">
                    <a href="#">Thailand</a>
                    <p>
                      <span>14 tours</span>
                      <span>6 places</span>
                    </p>
                  </div>
                </div>
                <div class="gallery-item item-medium">
                  <img src={imageSrc7} alt="South Korea" />
                  <div class="item-title">
                    <a href="#">South Korea</a>
                    <p>
                      <span>16 tours</span>
                      <span>8 places</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section-4 */}
      <section id="packages" className="contact-section">
        <div id="pack" className="packages">
          <div className="gallery-header text-center">
            <h2>special packages</h2>
            <p>
              Duis aute irure dolor in velit esse cillum dolore eu fugiat nulla.
            </p>
          </div>
          <div className="row1">
            <div className="single-package-item">
              <img src={imageSrc1} alt="service-icon" />

              <div className="single-package-item-txt">
                <h3>
                  italy <span className="pull-right">$499</span>
                </h3>
                <div className="packages-para">
                  <p>
                    <span>
                      <i className="fa fa-angle-right"></i> 5 days 6 nights
                    </span>
                    <i className="fa fa-angle-right"></i> 5 star accommodation
                  </p>
                  <p>
                    <span>
                      <i className="fa fa-angle-right"></i> transportation
                    </span>
                    <i className="fa fa-angle-right"></i> food facilities
                  </p>
                </div>
                <div className="packages-review">
                  <p>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <span>2544 reviews</span>
                  </p>
                </div>
                <div className="about-btn">
                  <button className="about-view packages-btn">book now</button>
                </div>
              </div>
            </div>
            <div className="single-package-item">
              <img src={imageSrc1} alt="service-icon" />

              <div className="single-package-item-txt">
                <h3>
                  england <span className="pull-right">$1499</span>
                </h3>
                <div className="packages-para">
                  <p>
                    <span>
                      <i className="fa fa-angle-right"></i> 5 days 6 nights
                    </span>
                    <i className="fa fa-angle-right"></i> 5 star accommodation
                  </p>
                  <p>
                    <span>
                      <i className="fa fa-angle-right"></i> transportation
                    </span>
                    <i className="fa fa-angle-right"></i> food facilities
                  </p>
                </div>
                <div className="packages-review">
                  <p>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <span>2544 reviews</span>
                  </p>
                </div>
                <div className="about-btn">
                  <button className="about-view packages-btn">book now</button>
                </div>
              </div>
            </div>
            <div className="single-package-item">
              <img src={imageSrc1} alt="service-icon" />

              <div className="single-package-item-txt">
                <h3>
                  england <span className="pull-right">$1499</span>
                </h3>
                <div className="packages-para">
                  <p>
                    <span>
                      <i className="fa fa-angle-right"></i> 5 days 6 nights
                    </span>
                    <i className="fa fa-angle-right"></i> 5 star accommodation
                  </p>
                  <p>
                    <span>
                      <i className="fa fa-angle-right"></i> transportation
                    </span>
                    <i className="fa fa-angle-right"></i> food facilities
                  </p>
                </div>
                <div className="packages-review">
                  <p>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <span>2544 reviews</span>
                  </p>
                </div>
                <div className="about-btn">
                  <button className="about-view packages-btn">book now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {section-5} */}

      <section id="reviews" className="client-review">
        <div className="review-container">
          <div className="review-title">
            <h2>client Reviews</h2>
            <p>
              Duis aute irure dolor in velit esse cillum dolore eu fugiat nulla.
            </p>
          </div>
          <div className="review-content">
            <div className="review-item">
              <div className="review-item-img">
                <img src={imageSrc1} alt="profile-image" />
              </div>
              <div className="review-item-text">
                <p>
                  Duis aute irure dolor in velit esse cillum dolore eu fugiat
                  nulla.
                </p>
              </div>
            </div>

            <div className="review-item">
              <div className="review-item-img">
                <img src={imageSrc1} alt="profile-image" />
              </div>
              <div className="review-item-text">
                <p>
                  Duis aute irure dolor in velit esse cillum dolore eu fugiat
                  nulla.
                </p>
              </div>
            </div>
            <div className="review-item">
              <div className="review-item-img">
                <img src={imageSrc1} alt="profile-image" />
              </div>
              <div className="review-item-text">
                <p>
                  Duis aute irure dolor in velit esse cillum dolore eu fugiat
                  nulla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {footer section} */}
      <button id="scroll-top-button" onClick={scrollToTop}>
        Top
      </button>
      <br />
      <br />
      <section id="footer-section">
        <footer className="footer-section bg-dark text-white py-3 text-center">
          <div className="container">
            <ul className="list-inline mb-3">
              <li className="list-inline-item">
                <Link
                  to="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-facebook"></i>{" "}
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-twitter"></i>{" "}
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-instagram"></i>{" "}
                </Link>
              </li>
            </ul>

            <p>
              © {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </p>
            <p>Contact: contact@Dreamers.com</p>
            <p>Address: 1234 Main Street, City, Country </p>
          </div>
        </footer>
      </section>
      <div>
        {images.map((tourImage) => (
          <div key={tourImage.Id}>
            <h2>{tourImage.Name}</h2>
            {tourImage.ImagePath && (
              <img src={tourImage.ImagePath} alt={tourImage.Name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
