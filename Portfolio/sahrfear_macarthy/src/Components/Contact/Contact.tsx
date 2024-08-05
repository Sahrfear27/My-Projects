import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import "./Contact.css";
type Props = {
  id: string;
};
export default function Contact(props: Props) {
  const { id } = props;
  return (
    <section id="contact" className="bg-image contact-sec">
      <div className="container text-center" data-aos="zoom-in">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-card">
              <div id="contact">
                <div className="title-card">
                  <h2 className="title-header">Contact Me</h2>
                </div>

                <div className="callMe">
                  <div>
                    <div>
                      <h3>Address</h3>

                      <p>
                        <a href="" className="locLink">
                          {" "}
                          <IoLocationOutline />
                        </a>
                        <span className="location">
                          4083 San Ramon Way, San Jose, CA
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h3>Phone</h3>
                      <p>
                        <a href="" className="phoLink">
                          <FiPhone />
                        </a>
                        <span className="phone">+1(669) 799-7164</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h3>Email</h3>

                      <p>
                        <a href="" className="emailLink">
                          <MdOutlineMailOutline />
                        </a>
                        <span className="email">
                          sahrfearmacarthy@gmail.com
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <form id="contactForm" role="form">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            name="message"
                            // rows="5"
                            placeholder="Message"
                            id="message"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12 text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                  <p id="responseMessage"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
