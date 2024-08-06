import React from "react";
import "./Service.css";
type Props = {
  id?: string;
};
export default function Service(props: Props) {
  const { id } = props;
  return (
    // <section id={id} className="vh-100 service">
    //   <div>Service</div>
    //   <p>The vh-100</p>
    // </section>
    <section id={id} className="services-mf pt-5" data-aos="zoom-in">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="title-box text-center">
              <h3 className="title-a">My Core Competencies</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-12">
            <div className="service-box">
              <div className="service-content">
                <h2 className="s-title">Front-End Development</h2>
                <p className="s-description" style={{ textAlign: "left" }}>
                  Creating visually engaging and interactive components for
                  single-page websites and web applications, providing a
                  seamless user experience. Utilizing the latest React and
                  Angular features to develop robust, scalable, and secure
                  applications
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="service-box">
              <div className="service-ico">
                <span className="ico-circle">
                  <i className="bi bi-server"></i>
                </span>
              </div>
              <div className="service-content">
                <h2 className="s-title">Back-End Development</h2>
                <p className="s-description" style={{ textAlign: "left" }}>
                  Designing and implementing server-side architecture using
                  Node.js and Express to write RESTful API endpoints, ensuring
                  secure communication between the front end and back end
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="service-box">
              <div className="service-ico">
                <span className="ico-circle">
                  <i className="bi bi-server"></i>
                </span>
              </div>
              <div className="service-content">
                <h2 className="s-title">Mobile Application</h2>
                <p className="s-description" style={{ textAlign: "left" }}>
                  Crafting comprehensive React Native mobile application for
                  both IOS and Android devices using the same codebase.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="service-box">
              <div className="service-ico">
                <span className="ico-circle">
                  <i className="bi bi-database"></i>
                </span>
              </div>
              <div className="service-content">
                <h2 className="s-title">DataBase Management</h2>
                <p className="s-description" style={{ textAlign: "left" }}>
                  Integrating MongoDB with the application's back-end logic,
                  handling data migrations and scaling the database as needed
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="service-box">
              <div className="service-ico">
                <span className="ico-circle">
                  <i className="bi bi-github"></i>
                </span>
              </div>
              <div className="service-content">
                <h2 className="s-title">Version Control System</h2>
                <p className="s-description" style={{ textAlign: "left" }}>
                  Competent in version control systems like Git for effective
                  collaboration and code management within development teams.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="service-box">
              <div className="service-ico">
                {/* <span className="ico-circle"
                    ><i className="bi bi-lightbulb-fill"></i
                  ></span> */}
              </div>
              <div className="service-content">
                <h2 className="s-title">Problem Solving Skills</h2>
                <p className="s-description" style={{ alignItems: "left" }}>
                  Empowering projects with a problem-solving mindset that drives
                  success and innovation.Excel at overcoming challenges and
                  always eager to learn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
