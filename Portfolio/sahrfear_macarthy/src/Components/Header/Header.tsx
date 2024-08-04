import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-scroll";
import "./Header.css";
import logo from "../../Images/hero.png";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="header" fixed="top">
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
              <Link
                to="hero"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Hero
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="text-white"
              >
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="service"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Service
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Projects
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="education"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Education
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="testimonies"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Testimonies
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Contact
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="footer"
                smooth={true}
                duration={500}
                className="text-white"
              >
                Footer
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
