import App from "../App";
import About from "../Components/About/About";
import Education from "../Components/Education/Education";
import Header from "../Components/Header/Header";
import Service from "../Components/myServices/Service";
import Projects from "../Components/Projects/Projects";

export default [
  {
    path: "",
    element: <Header />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Service",
    element: <Service />,
  },
  {
    path: "/Project",
    element: <Projects />,
  },
  {
    path: "/Education",
    element: <Education />,
  },
];
