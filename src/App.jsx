
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/pages/tareas/FormularioTareas";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import AdministrarUsuarios from "./components/pages/usuarios/AdministrarUsuarios";
import RegistrarUsuario from "./components/pages/usuarios/RegistrarUsuario";
import InicioSesion from "./components/pages/usuarios/InicioSesion";


function App() {
  return (
    <>
       <Menu></Menu>
      <Container className="mainPage mt-5">
        
      {/*<FormularioTareas></FormularioTareas>*/}
       <AdministrarUsuarios></AdministrarUsuarios>
       {/*<InicioSesion></InicioSesion>
        <RegistrarUsuario></RegistrarUsuario>*/}
      </Container>
      <Footer></Footer>
      
    </>
  );
}

export default App;
