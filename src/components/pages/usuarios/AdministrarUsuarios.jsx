import { Table, Button, Spinner } from "react-bootstrap";
import FilaUsuario from "./FilaUsuario";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { leerUsuariosAPI } from "../../../helpers/usuario.queries";

const AdministrarUsuarios = ({ usuarioLogueado }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      setIsLoading(true);
      const resp = await leerUsuariosAPI(usuarioLogueado.token);
      if (resp === 498) {
        Swal.fire({
          title: "Sesión expirada!",
          text: `Por favor vuelva a iniciar sesión`,
          icon: "error",
        });
        setUsuarioLogueado("");
        navegacion("/");
      }
      setUsuarios(resp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error al cargar los datos desde la API");
      setIsLoading(false);
    }
  };

  const mostrarComponente = isLoading ? (
    <div className="my-4 text-center">
      <Spinner animation="border" variant="success" />
    </div>
  ) : (
    <Table responsive striped bordered hover className="shadow">
      <thead className="table-dark">
        <tr className="text-center">
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Habilitado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="pt-3">
        {usuarios.map((usuario) => (
          <FilaUsuario
            key={usuario._id}
            usuario={usuario}
            setUsuarios={setUsuarios}
            token={usuarioLogueado.token}
          />
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="mt-5">
      <h3 className="text-white mt-5 ">Administrar Usuarios</h3>
      <hr className="text-white"/>
      {mostrarComponente}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AdministrarUsuarios;
