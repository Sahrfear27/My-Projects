import About from "./Components/About/About";
import Header from "./Components/Header/Header";
import Service from "./Components/myServices/Service";
import Projects from "./Components/Projects/Projects";
import Education from "./Components/Education/Education";
import Testimonies from "./Components/Testimonies/Testimonies";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import "./App.css";
// import Test from "./Components/Test";
export default function App() {
  return (
    <div>
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
  );
}
