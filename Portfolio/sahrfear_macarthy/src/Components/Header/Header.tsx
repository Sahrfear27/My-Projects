import React, { useContext, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-scroll";
import "./Header.css";
import logo from "../../Images/hero.png";
import TheameContex from "../Theame/Theame";

export default function Header() {
  const { lightMode, setLightMode } = useContext(TheameContex);
  const linkStyle = {
    textDecoration: "none",
    color: "inherit", // Ensure color is inherited from parent
  };

  return (
    <Navbar
      expand="sm"
      className="page-container"
      fixed="top"
      data-lightmode={lightMode ? "true" : "false"}
    >
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "60px",
              height: "auto",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <div className="nav-link-wrapper">
              <Link to="hero" smooth={true} duration={500} style={linkStyle}>
                Home
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link to="about" smooth={true} duration={500} style={linkStyle}>
                About
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link to="service" smooth={true} duration={500} style={linkStyle}>
                Service
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link
                to="projects"
                smooth={true}
                duration={500}
                style={linkStyle}
              >
                Projects
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link
                to="education"
                smooth={true}
                duration={500}
                style={linkStyle}
              >
                Education
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link
                to="testimonies"
                smooth={true}
                duration={500}
                style={linkStyle}
              >
                Testimonies
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link to="contact" smooth={true} duration={500} style={linkStyle}>
                Contact
              </Link>
            </div>
            <div
              className="nav-link-wrapper"
              onClick={() => setLightMode(!lightMode)}
            >
              {lightMode ? <MdLightMode /> : <MdDarkMode />}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
