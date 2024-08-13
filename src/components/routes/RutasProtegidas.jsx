
const RutasProtegidas = ({ children, show }) => {
  const administrador =
    JSON.parse(sessionStorage.getItem("usuarioTareaFacil")) || null;
  if (!administrador || administrador.rol !== "admin") {
    show();
  } else {
    return children;
  }
};

export default RutasProtegidas;
