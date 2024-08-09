import React, { useContext } from "react";
import "./Service.css";
import TheameContex from "../Theame/Theame";

type Competence = {
  title: string;
  description: string;
};

const competences: Competence[] = [
  {
    title: "Front-End Development",
    description:
      "Designing interactive components for web apps and single-page sites. Leveraging React and Angular to build robust, scalable applications.",
  },
  {
    title: "Back-End Development",
    description:
      "Creating server-side architecture with Node.js and Express for secure RESTful APIs. Ensuring seamless communication between front-end and back-end.",
  },
  {
    title: "Mobile Application",
    description:
      "Crafting comprehensive React Native mobile applications for both iOS and Android devices using the same codebase.",
  },
  {
    title: "DataBase Management",
    description:
      "Integrating MongoDB with the application's back-end logic, handling data migrations, and scaling the database as needed.",
  },
  {
    title: "Version Control System",
    description:
      "Competent in version control systems like Git for effective collaboration and code management within development teams.",
  },
  {
    title: "Problem Solving Skills",
    description:
      "Empowering projects with a problem-solving mindset that drives success and innovation. Excellent at overcoming challenges and always eager to learn.",
  },
];

type Props = {
  id?: string;
};

export default function Service(props: Props) {
  const { lightMode } = useContext(TheameContex);
  const { id } = props;
  return (
    <section
      id={id}
      className={`services-mf pt-5 ${lightMode ? "light-mode" : "dark-mode"}`}
    >
      <div className="container">
        <h5 className="text-center mb-4">My Core Competencies</h5>
        <div className="row">
          {competences.map((competence, index) => (
            <div key={index} className="col-md-4 mb-4" data-aos="zoom-out-up">
              <div
                className={`service-card ${
                  lightMode ? "light-mode" : "dark-mode"
                }`}
              >
                <div className="service-card-inner">
                  <div className="service-card-front">
                    <h5 className="s-title">{competence.title}</h5>
                  </div>
                  <div className="service-card-back">
                    <p className="s-description">{competence.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
