import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./About.css";
import { TbBrandHtml5 } from "react-icons/tb";
import { IoLogoCss3 } from "react-icons/io5";
import { FaBootstrap } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { FaReact } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { FaAngular } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";
type Props = {
  id?: string;
};

export default function About(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 about">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-4 about-me">
            <p>
              <h5 style={{ textAlign: "center" }}>About Me</h5>
              My development journey began with a passion for problem-solving
              and coding. I've mastered front-end and back-end technologies,
              embracing the challenges of creating seamless solutions. I excel
              in building robust, scalable web applications that provide
              exceptional user experiences.
            </p>
            <div className="resume">
              <a
                href="assets/Sahrfear_Macarthy_resume.pdf"
                download="resume.pdf"
                id="download"
              >
                Get Resume <FaDownload />
              </a>
            </div>
          </div>
          <div className="col-sm-8 tech-card">
            <div className="container">
              <div className="row">
                <h5 style={{ textAlign: "center" }}>Technologies Used</h5>
                <div className="col-3">
                  <div className="tech-item">
                    <TbBrandHtml5 className="html-icon" />
                    <p>HTML5</p>
                  </div>
                  <div className="tech-item">
                    <IoLogoCss3 className="css-icon" />
                    <p>CSS</p>
                  </div>
                  <div className="tech-item">
                    <FaBootstrap className="boot-icon" />
                    <p>Bootstrap</p>
                  </div>
                  <div className="tech-item">
                    <TbBrandJavascript className="javaScript-icon" />
                    <p>JavaScript</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tech-item">
                    <BiLogoTypescript className="typeScript-icon" />
                    <p>TypeScript</p>
                  </div>
                  <div className="tech-item">
                    <RiTailwindCssFill className="tail-icon" />
                    <p>Tailwind</p>
                  </div>
                  <div className="tech-item">
                    <FaNode className="node-icon" />
                    <p>Node.js</p>
                  </div>
                  <div className="tech-item">
                    <SiExpress className="express-icon" />
                    <p>Express</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tech-item">
                    <GrMysql className="sql-icon" />
                    <p>SQL</p>
                  </div>
                  <div className="tech-item">
                    <FaReact className="react-icon" />
                    <p>React.Js</p>
                  </div>
                  <div className="tech-item">
                    <FaAngular className="angular-icon" />
                    <p>Angular</p>
                  </div>
                  <div className="tech-item">
                    <TbBrandReactNative className="react-native-icon" />
                    <p>React-Native</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tech-item">
                    <FaGithub className="git-icon" />
                    <p>Git</p>
                  </div>
                  <div className="tech-item">
                    <SiMongodb className="mongodb-icon" />
                    <p>MongoDB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
