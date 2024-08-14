import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import InicioSesion from "../pages/usuarios/InicioSesion";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logoTareaFacil.png"

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
          <NavLink to="/" className="text-white text-decoration-none">
            <img src={Logo} alt="" width={80} />
          </NavLink>

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
                  

                  <img
                    className="imgPerfil img-fluid mt-3"
                    src={usuarioLogueado.imagenPerfil}
                    alt=""
                    width={50}
                  />

                  <NavDropdown
                    title={usuarioLogueado.nombreUsuario}
                    id="collapsible-nav-dropdown"
                    className='m-lg-auto'
                  >
                    <NavLink end className="nav-link" to="/perfil">
                    <i className="bi bi-person-vcard-fill"> Perfil</i>
                    
                   
                    </NavLink>
                    {usuarioLogueado.rol === "admin" && (
                    <NavLink href="#link" className="nav-link" to="/administrar">
                      <i className="bi bi-person-fill-gear"> Administrar usuarios </i>
                        
                    
                    </NavLink>
                  )}
                    <NavLink className="nav-link" onClick={cerrarSesion}>
                      <i className="bi bi-power"> Cerrar sesión</i>
                    </NavLink>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavLink href="#home" to="/registro">
                    <button className="admin me-3 mt-2 mb-3">
                      Registrarse
                    </button>
                  </NavLink>
                  <NavLink href="#link" onClick={handleShowLoginModal}>
                  <button className="buttonSesion">INICIAR SESIÓN</button>
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

     
    </>
  );
};

export default Menu;
