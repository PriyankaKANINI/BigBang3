import React from "react";
import { Link } from "react-router-dom";
import "../about/about.css";
import imgSrc10 from "../images/female-tourist-with-camera-balcony_23-2147981885.avif";
import imgSrc11 from "../images/medium-shot-woman-traveling_23-2148601995.avif";
import imgSrc12 from "../images/businesswoman-posing.jpg";
import imgSrc13 from "../images/front-view-man-studio-shot.jpg";
import imgSrc15 from "../images/image-handsome-caucasian-man-party-suit-smiling-pleased-attend-formal-event-standing-white-background.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: imgSrc13,
      description:
        "John is a passionate traveler and entrepreneur. He founded Our Travel Co. with the vision of creating unforgettable travel experiences for people around the world.",
    },
    {
      name: "Emily Smith",
      role: "Head of Operations",
      image: imgSrc11,
      description:
        "Emily ensures smooth and seamless travel arrangements for our customers. With her expertise, every trip becomes a hassle-free and delightful experience.",
    },
    {
      name: "Elsa Ronald",
      role: "Head of Destinations",
      image: imgSrc12,
      description:
        "Elsa ensures smooth and seamless travel arrangements for our customers. With her expertise, every trip becomes a hassle-free and delightful experience.",
    },
    // Add more team members here...
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-sec-title">
          <h2>About Our Travel Co.</h2>
          <p>We Make Your Travel Experience Memorable</p>
        </div>
        <div className="about-text">
          <p>
            At Our Travel Co., we believe that traveling is not just about
            visiting new places; it's about creating memories that last a
            lifetime. With a passion for exploration and a commitment to
            excellence, we curate exceptional travel experiences for our
            customers.
          </p>
          <p>
            Our team of experienced travelers and professionals work together to
            craft meticulously planned tours that cater to your interests and
            preferences. Whether you seek adventure, relaxation, or cultural
            immersion, we have the perfect journey for you.
          </p>
        </div>

        <div className="team-members">
          <h2>Meet Our Team</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="team-member-card">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-sec-title-down">
          <h2>Our Tours</h2>
          <p>Explore the World with Us</p>
        </div>
        <div className="about-text">
          <p>
            Our Travel Co. offers a diverse range of tours that cater to various
            travel preferences. Whether you want to hike through breathtaking
            landscapes, relax on pristine beaches, or immerse yourself in
            vibrant cultures, we have the perfect tour for you.
          </p>
          <p>
            Each tour is carefully crafted to provide you with the best
            experiences, top-notch accommodations, and expert guides who know
            the destination inside out. Join us on our journeys and embark on
            unforgettable adventures.
          </p>
        </div>
        <div className="about-btn-box">
          <Link to="/tours" className="about-theme-btn btn-style-one">
            View All Tours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
