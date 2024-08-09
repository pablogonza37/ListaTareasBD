import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/pages/tareas/FormularioTareas";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import AdministrarUsuarios from "./components/pages/usuarios/AdministrarUsuarios";
import RegistrarUsuario from "./components/pages/usuarios/RegistrarUsuario";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const usuario = JSON.parse(sessionStorage.getItem("usuarioTareaFacil")) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
          handleShowLoginModal={handleShowLoginModal}
          handleCloseLoginModal={handleCloseLoginModal}
          showLoginModal={showLoginModal}
        ></Menu>
        <Container className="mainPage mt-5">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <FormularioTareas
                  usuarioLogueado={usuarioLogueado}
                  handleShowLoginModal={handleShowLoginModal}
                ></FormularioTareas>
              }
            ></Route>
            <Route
              exact
              path="/administrador"
              element={
                <AdministrarUsuarios
                  usuarioLogueado={usuarioLogueado}
                ></AdministrarUsuarios>
              }
            ></Route>
            <Route
              exact
              path="/registro"
              element={<RegistrarUsuario></RegistrarUsuario>}
            ></Route>
          </Routes>
        </Container>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
