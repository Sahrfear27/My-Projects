import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./About.css";
type Props = {
  id?: string;
};
export default function About(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 about">
      <div className="container">
        <div className="row gx-5 d-flex align-items-stretch">
          <div className="col-lg-4 mb-4">
            <div className="about-me pt-4 pt-md-0">
              <div className="title-box-2">
                <h5 className="About-Card">About me</h5>
              </div>
              <p className="lead">
                My development journey began with a passion for problem-solving
                and coding. I've mastered front-end and back-end technologies,
                embracing the challenges of creating seamless solutions. I excel
                in building robust, scalable web applications that provide
                exceptional user experiences
              </p>
              <div className="col">
                <div className="col-sm-6 col-md-5">
                  <div className="about-img">
                    <img
                      src=""
                      className="img-fluid rounded b-shadow-a"
                      alt=""
                    />
                  </div>
                </div>

                <div className="col-sm-6 col-md-7">
                  <div className="border-secondary subLocate">
                    <a href="#Location" className="fas fa-location-dot"></a>
                    <div>San Jose CA</div>
                    <a href="tel:6697997164" className="fas fa-phone"></a>
                    <div>6697997164</div>
                    <a
                      href="mailto:macarthysahralves@gmail.com"
                      className="fas fa-envelope"
                    ></a>
                    <div>Send Email</div>
                  </div>
                </div>
                <div className="resume">
                  <a
                    href="assets/Sahrfear_Macarthy_resume.pdf"
                    download="resume.pdf"
                    id="download"
                  >
                    Get Resume <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mb-4">
            <div className="skill-Card">
              <p className="title-s">Technologies Used</p>
              <div className="row row-cols-2 row-cols-md-5 g-4 parent-Main">
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-brands fa-html5 fa-lg"
                    style="color: #db530a"
                  ></i> */}
                    </div>
                    <p>HTML</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-brands fa-css3-alt fa-lg"
                    style="color: #165eda"
                  ></i> */}
                    </div>
                    <p>CSS</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-brands fa-js fa-lg"
                    style="color: #eabd1a"
                  ></i> */}
                    </div>
                    <p>Javascript</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/typescript.svg"
                        className="icon-ts"
                        alt="TypeScript Icon"
                      />
                    </div>
                    <p>TypeScript</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech"></div>
                    <p>ReactJS</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech"></div>
                    <p>NodeJS</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/express.svg"
                        className="icon-ts"
                        alt="Express Icon"
                      />
                    </div>
                    <p>ExpressJS</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-solid fa-database fa-lg"
                    style="color: #6ea560"
                  ></i> */}
                    </div>
                    <p>MongoDB</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-brands fa-bootstrap fa-lg"
                    style="color: #7211f5"
                  ></i> */}
                    </div>
                    <p>Bootstrap</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    class="fa-brands fa-github fa-lg"
                    style="color: #ffffff"
                  ></i> */}
                    </div>
                    <p>GitHub</p>
                  </div>
                </div>

                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-brands fa-react fa-rotate-180 fa-lg"
                    style="color: #74c6e2"
                  ></i> */}
                    </div>
                    <p>React Native</p>
                  </div>
                </div>
                <div className="col">
                  <div className="parent-tech">
                    <div className="child-tech">
                      {/* <i
                    className="fa-brands fa-angular fa-lg"
                    style="color: #a30f6d"
                  ></i> */}
                    </div>
                    <p>Angular</p>
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
