import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "bootstrap/dist/css/bootstrap.css";
import "./Hero.css";
import file from "../../Images/file.png";

type Props = {
  id: string;
};

export default function Hero(props: Props) {
  const { id } = props;
  const el = useRef<HTMLSpanElement>(null); // Create reference to store the DOM element containing the animation
  const typed = useRef<any>(null); // Create reference to store the Typed instance itself

  useEffect(() => {
    const options = {
      strings: [
        '<span class="js-developer">JavaScript Developer</span>',
        '<span class="fullstack-developer">FullStack Developer</span>',
        '<span class="mobile-app-developer">Mobile App Developer</span>',
      ],
      typeSpeed: 100,
      startDelay: 500, // delay before animation starts
      backDelay: 1000, // delay before backspacing
      backSpeed: 80, // speed of backspacing
      loop: true,
      showCursor: false,
      cursorChar: "|",
      contentType: "html", // Allow HTML content in the strings
    };

    // Initialize Typed.js
    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    // Cleanup on component unmount
    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  return (
    <section id={id} className="hero bg-image vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-8 text-center text-md-start mb-4 mb-md-0">
            <h2 className="top-header">I am Sahrfear Macarthy</h2>
            <div className="fs-5 fw-bold">
              <span ref={el} />
            </div>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end">
            <img
              src={file}
              alt="Hero"
              className="img-fluid"
              style={{ maxWidth: "300px", height: "300px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
