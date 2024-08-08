import React from "react";
import "./Service.css";
type Props = {
  id?: string;
};
export default function Service(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="services-mf pt-5" data-aos="zoom-in">
      <div className="container">
        <div className="row">
          <p>This is services</p>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="container">
<h5 className="title-a" style={{ textAlign: "center" }}>
  My Core Competencies
</h5>
<div className="row">
  <div className="col-md-4 col-12 service-box">
    <h5 className="s-title">Front-End Development</h5>
    <p className="s-description" style={{ textAlign: "left" }}>
      Designing interactive components for web apps and single-page
      sites. Leveraging React and Angular to build robust, scalable
      applications
    </p>
  </div>
  <div className="col-md-4 col-12 service-box">
    <h5 className="s-title">Back-End Development</h5>
    <p className="s-description" style={{ textAlign: "left" }}>
      Creating server-side architecture with Node.js and Express for
      secure RESTful APIs. Ensuring seamless communication between
      front-end and back-end
    </p>
  </div>
  <div className="col-md-4 col-12 service-box">
    <h5 className="s-title">Mobile Application</h5>
    <p className="s-description" style={{ textAlign: "left" }}>
      Crafting comprehensive React Native mobile application for both
      IOS and Android devices using the same codebase.
    </p>
  </div>
  <div className="col-md-4 col-12 service-box">
    <h5 className="s-title">DataBase Management</h5>
    <p className="s-description" style={{ textAlign: "left" }}>
      Integrating MongoDB with the application's back-end logic,
      handling data migrations and scaling the database as needed
    </p>
  </div>
  <div className="col-md-4 col-12 service-box">
    <h5 className="s-title">Version Control System</h5>
    <p className="s-description" style={{ textAlign: "left" }}>
      Competent in version control systems like Git for effective
      collaboration and code management within development teams.
    </p>
  </div>
  <div className="col-md-4 col-12 service-box">
    <h5 className="s-title">Problem Solving Skills</h5>
    <p className="s-description" style={{ textAlign: "left" }}>
      Empowering projects with a problem-solving mindset that drives
      success and innovation.Excel at overcoming challenges and always
      eager to learn
    </p>
  </div>
</div>
</div> */
}
