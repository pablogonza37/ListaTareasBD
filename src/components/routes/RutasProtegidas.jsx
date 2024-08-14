import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children, show }) => {
  const administrador =
    JSON.parse(sessionStorage.getItem("usuarioTareaFacil")) || null;
  if (!administrador || administrador.rol !== "admin") {
    return <Navigate to={'/'}></Navigate>
  } else {
    return children;
  }
};

export default RutasProtegidas;
