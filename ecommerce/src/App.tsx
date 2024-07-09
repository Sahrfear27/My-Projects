import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/HeaderPage/Header";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
function App() {
  return (
    <div className="App">
      <div className="headerCard">
        <Header />
      </div>
      <div className="navBarCard">
        <NavBar />
      </div>
    </div>
  );
}

export default App;
