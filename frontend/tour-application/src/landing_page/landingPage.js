import React from "react";
import { Link } from "react-router-dom";
import "../landing_page/landingPage.css";
import Register from "../Register/register";
import imageSrc1 from "../images/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand.jpg";
import imageSrc2 from "../images/young-woman-hiker-taking-photo-with-smartphone-mountains-peak-winter.jpg";
import imageSrc3 from "../images/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand.jpg";
import imageSrc4 from "../images/couple-together-kayaking-river.jpg";
import imageSrc5 from "../images/couple-tourists-with-backpacks-mountain.jpg";
import imageSrc6 from "../images/woman-walking-big-entrance-gate-bali-indonesia.jpg";
import imageSrc7 from "../images/photographer-hand-holding-camera-standing-viewpoint-clouds-panorama-viewpoint-sunrise.jpg";

import "bootstrap-icons/font/bootstrap-icons.css";

const LandingPage = () => {
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
              <li className="nav-item">
                <Link to="#travel-packages" className="nav-link">
                  Travel Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#testimonials" className="nav-link">
                  Testimonials
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#contact" className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="login" className="nav-link">
                  Login/SignIn
                </Link>
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
          </div>
        </div>
      </section>
      {/* section-2 */}
      {/* <section id="service" className="service">
        <div className="container">
          <div className="service-counter text-center">
            <div className="col-md-4 col-sm-4">
              <div className="single-service-box">
                <div className="service-img">
                  <img src={imageSrc} alt="service-icon" />
                </div>
                <div className="service-content">
                  <h2>
                    <a href="#">amazing tour packages</a>
                  </h2>
                  <p>
                    Duis aute irure dolor in velit esse cillum dolore eu fugiat
                    nulla.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div className="single-service-box">
                <div className="service-img">
                  <img src={imageSrc} alt="service-icon" />
                </div>
                <div className="service-content">
                  <h2>
                    <a href="#">book top class hotel</a>
                  </h2>
                  <p>
                    Duis aute irure dolor in velit esse cillum dolore eu fugiat
                    nulla.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div className="single-service-box">
                <div className="statistics-img">
                  <img src={imageSrc} alt="service-icon" />
                </div>
                <div className="service-content">
                  <h2>
                    <a href="#">online flight booking</a>
                  </h2>
                  <p>
                    Duis aute irure dolor in velit esse cillum dolore eu fugiat
                    nulla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                {/* <div class="gallery-item item-small">
                  <img src={imageSrc5} alt="Netherlands" />
                  <div class="item-title">
                    <a href="#">Netherlands</a>
                    <p>
                      <span>14 tours</span>
                      <span>12 places</span>
                    </p>
                  </div>
                </div> */}
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
      <section id="packages" className="contact-section py-5">
        <div id="pack" className="packages">
          <div className="container">
            <div className="gallary-header text-center">
              <h2>special packages</h2>
              <p>
                Duis aute irure dolor in velit esse cillum dolore eu fugiat
                nulla.
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
                    <button className="about-view packages-btn">
                      book now
                    </button>
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
                    <button className="about-view packages-btn">
                      book now
                    </button>
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
                    <button className="about-view packages-btn">
                      book now
                    </button>
                  </div>
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
            <div className="carousel-wrapper">
              <input checked type="radio" name="slider" id="slide1" />
              <input type="radio" name="slider" id="slide2" />
              <input type="radio" name="slider" id="slide3" />
              <input type="radio" name="slider" id="slide4" />
              <input type="radio" name="slider" id="slide5" />
              <div className="carousel">
                <div className="review-item">
                  <div className="review-item-img">
                    <img src={imageSrc1} alt="profile-image" />
                  </div>
                  <div className="review-item-text">
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
                <div className="review-item">
                  <div className="review-item-img">
                    <img src={imageSrc1} alt="profile-image" />
                  </div>
                  <div className="review-item-text">
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
                <div className="review-item">
                  <div className="review-item-img">
                    <img src={imageSrc1} alt="profile-image" />
                  </div>
                  <div className="review-item-text">
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
                <div className="review-item">
                  <div className="review-item-img">
                    <img src={imageSrc1} alt="profile-image" />
                  </div>
                  <div className="review-item-text">
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
                <div className="review-item">
                  <div className="review-item-img">
                    <img src={imageSrc1} alt="profile-image" />
                  </div>
                  <div className="review-item-text">
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider-prev-next-control">
                <label for="slide1"></label>
                <label for="slide2"></label>
                <label for="slide3"></label>
                <label for="slide4"></label>
                <label for="slide5"></label>
              </div>

              <div class="slider-dot-control">
                <label for="slide1"></label>
                <label for="slide2"></label>
                <label for="slide3"></label>
                <label for="slide4"></label>
                <label for="slide5"></label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {section footer} */}
      <footer className="footer-section bg-dark text-white py-3 text-center">
        <div className="container"></div>
      </footer>
    </div>
  );
};

export default LandingPage;
