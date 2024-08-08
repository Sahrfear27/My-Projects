import About from "./Components/About/About";
import Header from "./Components/Header/Header";
import Service from "./Components/myServices/Service";
import Projects from "./Components/Projects/Projects";
import Education from "./Components/Education/Education";
import Testimonies from "./Components/Testimonies/Testimonies";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "./App.css";
import { useEffect, useState } from "react";
import TheameContex from "./Components/Theame/Theame";
export default function App() {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <TheameContex.Provider value={{ lightMode, setLightMode }}>
      <div className={lightMode ? "light-mode" : "dark-mode"}>
        <Header />
        <Hero id="hero" />
        <About id="about" />
        <Service id="service" />
        <Projects id="projects" />
        <Education id="education" />
        <Testimonies id="testimonies" />
        <Contact id="contact" />
        <Footer id="footer" />
      </div>
    </TheameContex.Provider>
  );
}
