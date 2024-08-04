import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BiX } from "react-icons/bi";
import InicioSesion from "../pages/usuarios/InicioSesion";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Menu = ({
  usuarioLogueado,
  setUsuarioLogueado,
  handleCloseLoginModal,
  handleShowLoginModal,
  showLoginModal,
}) => {
  const [menuDesplegado, setMenuDesplegado] = useState(false);

  const toggleMenu = () => {
    setMenuDesplegado(!menuDesplegado);
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem("usuarioTareaFacil");
    setUsuarioLogueado("");
    navegacion("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark shadow fixed-top text-white">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#" className="text-white">
            <i className="bi bi-card-list me-2"></i>Lista de tareas
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="custom-toggler border-0"
            onClick={toggleMenu}
          >
            {menuDesplegado ? (
              <i className="text-white bi bi-x-lg"></i>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {usuarioLogueado !== "" ? (
                <>
                  {usuarioLogueado.rol === "admin" && (
                    <NavLink href="#link" to="/administrador">
                      <button className="admin me-3 mt-2">Administrar</button>
                    </NavLink>
                  )}

                  <NavLink href="#link" onClick={cerrarSesion}>
                    <button className="sesion">Cerrar sesión</button>
                  </NavLink>
                  <Navbar.Text className="text-white mt-2 ms-2">
                    Signed in as: <a href="#login">Mark Otto</a>
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <NavLink href="#home" to="/registro">
                    <button className="admin me-3 mt-2">Registrarse</button>
                  </NavLink>
                  <NavLink href="#link" onClick={handleShowLoginModal}>
                    <button className="sesion">iniciar sesión</button>
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <InicioSesion
        show={showLoginModal}
        onHide={handleCloseLoginModal}
        setUsuarioLogueado={setUsuarioLogueado}
        usuarioLogueado={usuarioLogueado}
      ></InicioSesion>
    </>
  );
};

export default Menu;
