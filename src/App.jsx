import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/FormularioTareas";
import Footer from "./components/Footer";
import ListaTareas from "./components/ListaTareas";

function App() {
  return (
    <>
      <Container className="mainPage">
        <h1 className="text-center my-4 text-light display-3">Lista de Tareas</h1>
        <FormularioTareas></FormularioTareas>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default App;
