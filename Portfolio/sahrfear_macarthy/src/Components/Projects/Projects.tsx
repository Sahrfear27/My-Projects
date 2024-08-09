import React from "react";
import "./Project.css";

type Props = {
  id?: string;
};

export default function Projects(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 project py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <h3 className="mb-3">Drug App</h3>
            {/* Video for drug */}
            <div className="drugVideo bg-light p-3 rounded">
              {/* Add video content here */}
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <h3 className="mb-3">
              Integrated Library Management System (ILMS)
            </h3>
            {/* Video for ILMS */}
            <div className="library bg-light p-3 rounded">
              {/* Add video content here */}
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <h3 className="mb-3">Amazon Clone</h3>
            {/* Video for Amazon */}
            <div className="amazon bg-light p-3 rounded">
              {/* Add video content here */}
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <h3 className="mb-3">Weather App</h3>
            {/* Video for weather */}
            <div className="weather bg-light p-3 rounded">
              {/* Add video content here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
