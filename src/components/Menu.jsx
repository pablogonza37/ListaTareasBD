import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import { BiX } from "react-icons/bi"; 

const Menu = () => {
  const [menuDesplegado, setMenuDesplegado] = useState(false); // Estado para controlar si el menú está desplegado

  const toggleMenu = () => {
    setMenuDesplegado(!menuDesplegado);
  };


  return (
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
            <Nav.Link href="#home"><button className="admin me-3 mt-2">Registrarse</button></Nav.Link>
            <Nav.Link href="#link"><button className="admin me-3 mt-2">Administrar</button></Nav.Link>
            <Nav.Link href="#link"><button className="sesion">iniciar sesión</button></Nav.Link>
            <Navbar.Text className='text-white mt-2 ms-2'>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
          </Nav>
        </Navbar.Collapse>






        
      </Container>
    </Navbar>
  );
};

export default Menu;
