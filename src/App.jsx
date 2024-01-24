import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/FormularioTareas";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Container>
        <h1 className="text-center my-4">Lista de Tareas</h1>
        <FormularioTareas></FormularioTareas>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default App;
