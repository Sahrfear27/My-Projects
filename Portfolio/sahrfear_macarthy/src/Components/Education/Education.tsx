import React from "react";
import "./Education.css";

type Props = {
  id?: string;
};

export default function Education(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="education-card vh-100">
      <div className="container">
        <div className="row timelines mt-5">
          <div className="col-12 col-md-6 timeline education">
            <h2 className="timeline-title">Education</h2>
            <div className="timeline-items">
              <div className="timeline-item">
                <h3>Master of Science in Software Development</h3>
                <time dateTime="2023/2024">2023 &ndash; 2024</time>
                <div className="location">
                  Maharishi International University, Iowa, United States
                </div>
              </div>
              <div className="timeline-item">
                <h3>Bachelor of Science in Physics</h3>
                <time dateTime="2015/2019">2015 &ndash; 2019</time>
                <div className="location">
                  Fourah Bay College, University Of Sierra Leone
                </div>
              </div>
              <div className="timeline-item">
                <h3>CompTIA Certification</h3>
                <time dateTime="2015/2017">2015 &ndash; 2017</time>
                <div className="location">Blue Crest College, Sierra Leone</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 timeline experience">
            <h2 className="timeline-title">Experience</h2>
            <div className="timeline-items">
              <div className="timeline-item">
                <h3>Full-Stack Developer</h3>
                <time dateTime="2023/2024">2023 &ndash; 2024</time>
                <div className="location">
                  Maharishi International University, Iowa, United States
                </div>
              </div>
              <div className="timeline-item">
                <h3>Associate Test Engineer</h3>
                <time dateTime="2021/2022">2021 &ndash; 2022</time>
                <div className="location">
                  Onto Innovation Company, CA, United States
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
