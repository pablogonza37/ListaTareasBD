import { Table, Button, Badge } from "react-bootstrap";
import { borrarUsuarioAPI, leerUsuariosAPI } from "../../../helpers/usuario.queries";
import Swal from "sweetalert2";

const FilaUsuario = ( {usuario, setUsuarios} ) => {

  const borrarUsuario = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el usuario?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarUsuarioAPI(usuario._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario Eliminado",
            text: `El usuario "${usuario.nombreUsuario}" fue eliminado correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI();
          setUsuarios(listaUsuarios);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `El usuario "${usuario.nombreUsuario}" no fue eliminado. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

    return (
        <tr className="text-center">
            <td >{usuario.nombreUsuario}</td>
            <td>{usuario.email}</td>
            <td>{usuario.rol}</td>
            <td><Badge bg="primary">{`${usuario.habilitado}`}</Badge></td>
            <td className="text-center">
              <Button className="btn btn-secondary">
                <i className="bi bi-plus-circle"></i>
              </Button>
              <Button variant="danger" className="ms-lg-1 mt-lg-0" onClick={borrarUsuario}>
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
    );
};

export default FilaUsuario;