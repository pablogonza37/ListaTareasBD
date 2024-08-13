import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import FormularioTareas from "./components/pages/tareas/FormularioTareas";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import RegistrarUsuario from "./components/pages/usuarios/RegistrarUsuario";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PerfilUsuario from "./components/pages/usuarios/PerfilUsuario";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAdmin from "./components/routes/RutasAdmin";

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
                usuarioLogueado ? (
                  <FormularioTareas
                    usuarioLogueado={usuarioLogueado}
                    handleShowLoginModal={handleShowLoginModal}
                  ></FormularioTareas>
                ) : (
                  
                  <div className="alert alert-info mt-5">Por favor, inicia sesión para ver tus tareas.</div>
                )
              }
            ></Route>
            <Route
            exact
            path="/administrar/*"
            element={
              <RutasProtegidas show={handleShowLoginModal}>
                <RutasAdmin usuarioLogueado={usuarioLogueado}></RutasAdmin>
              </RutasProtegidas>
            }
          ></Route>
            <Route
              exact
              path="/registro"
              element={<RegistrarUsuario></RegistrarUsuario>}
            ></Route>
            <Route
              exact
              path="/perfil"
              element={<PerfilUsuario usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></PerfilUsuario>}
            ></Route>
          </Routes>
        </Container>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
