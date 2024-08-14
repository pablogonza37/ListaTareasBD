import { Routes, Route } from "react-router";
import AdministrarUsuarios from "../pages/usuarios/AdministrarUsuarios";

const RutasAdmin = ({ usuarioLogueado }) => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AdministrarUsuarios
              usuarioLogueado={usuarioLogueado}
            ></AdministrarUsuarios>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default RutasAdmin;
