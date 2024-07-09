import React from "react";
import "./nav.css";
export default function NavBar() {
  return (
    <div className="header">
      <div className="container">
        <div className="logo pull-left">
          <h1>
            <a href="index.html">MyFolio</a>
          </h1>
        </div>

        <nav id="nav-menu-container">
          <ul className="nav-menu">
            <li>
              <a href="#top-header">Home</a>
            </li>
            <li>
              <a href="#about">About me</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#contact">Contact me</a>
            </li>
          </ul>
        </nav>

        <nav className="nav social-nav pull-right d-none d-lg-inline">
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>{" "}
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>{" "}
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
        </nav>
      </div>
    </div>
  );
}
