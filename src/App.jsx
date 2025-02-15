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
import InicioSesion from "./components/pages/usuarios/InicioSesion";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const usuario = JSON.parse(sessionStorage.getItem("usuarioTareaFacil")) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <>
      <BrowserRouter>
      {usuarioLogueado && (
          <Menu
            usuarioLogueado={usuarioLogueado}
            setUsuarioLogueado={setUsuarioLogueado}
            handleShowLoginModal={handleShowLoginModal}
            handleCloseLoginModal={handleCloseLoginModal}
            showLoginModal={showLoginModal}
          />
        )}
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
                    setUsuarioLogueado={setUsuarioLogueado}
                  ></FormularioTareas>
                ) : (
                  <InicioSesion
                  show={showLoginModal}
                  onHide={handleCloseLoginModal}
                  setUsuarioLogueado={setUsuarioLogueado}
                  usuarioLogueado={usuarioLogueado}
                ></InicioSesion>
                  
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
