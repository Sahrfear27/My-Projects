import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-scroll";
import "./Header.css";
import logo from "../../Images/hero.png";

export default function Header() {
  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Navbar variant="dark" expand="sm" className="header" fixed="top">
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
            <Nav.Link>
              <Link to="hero" smooth={true} duration={500} style={linkStyle}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="about" smooth={true} duration={500} style={linkStyle}>
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="service" smooth={true} duration={500} style={linkStyle}>
                Service
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                style={linkStyle}
              >
                Projects
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="education"
                smooth={true}
                duration={500}
                style={linkStyle}
              >
                Education
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="testimonies"
                smooth={true}
                duration={500}
                style={linkStyle}
              >
                Testimonies
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="contact" smooth={true} duration={500} style={linkStyle}>
                Contact
              </Link>
            </Nav.Link>
            {/* <Nav.Link>
              <Link to="footer" smooth={true} duration={500} style={linkStyle}>
                Footer
              </Link>
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
