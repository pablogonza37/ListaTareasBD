import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/FormularioTareas";

function App() {
  return (
    <>
      <Container>
        <h1 className="text-center my-4">Lista de Tareas</h1>
        <FormularioTareas></FormularioTareas>
      </Container>
    </>
  );
}

export default App;
