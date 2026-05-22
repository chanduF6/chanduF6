import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <div className="about-hero">

        <h1>About Foodie Hub 🍔</h1>

        <p>
          Welcome to Foodie Hub — your favorite online food
          ordering platform where delicious meals meet fast delivery.
        </p>

      </div>

      {/* About Content */}
      <div className="about-content">

        <div className="about-card">

          <h2>🍕 Our Mission</h2>

          <p>
            Our mission is to provide fresh, tasty, and affordable
            food to everyone with a smooth online ordering experience.
          </p>

        </div>

        <div className="about-card">

          <h2>🚀 Fast Delivery</h2>

          <p>
            We deliver your favorite meals quickly and safely right
            to your doorstep with real-time order updates.
          </p>

        </div>

        <div className="about-card">

          <h2>🥗 Quality Food</h2>

          <p>
            We partner with trusted restaurants to ensure quality,
            hygiene, and delicious taste in every order.
          </p>

        </div>

      </div>

      {/* Team Section */}
      <div className="team-section">

        <h2>👨‍🍳 Our Team</h2>

        <p>
          Foodie Hub is powered by passionate developers,
          chefs, and delivery partners working together
          to create the best food experience.
        </p>

      </div>

      {/* Footer */}
      <div className="about-footer">

        <h3>Thank You for Choosing Foodie Hub ❤️</h3>

      </div>

    </div>
  );
}

export default About;