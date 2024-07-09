import React from "react";
// import "./Header.css";
export default function Header() {
  return (
    <div className="top-header" id="top-header">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <img src="img/profile-pic.jpg" alt="Anamul Hasan" />
          </div>

          <div className="col-md-12">
            <h1>I'm Poppy Jackson</h1>
          </div>

          <div className="col-md-12">
            <p>
              Web Designer, Web Developer, Front End Developer, Apps Developer,
              Graphic Designer
            </p>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
