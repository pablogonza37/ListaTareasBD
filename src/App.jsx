
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/FormularioTareas";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Menu></Menu>
      <Container className="mainPage mt-5">
        
        <FormularioTareas></FormularioTareas>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default App;
