import { Table, Button, Badge } from "react-bootstrap";
import { borrarUsuarioAPI, leerUsuariosAPI, levantarSuspensionUsuarioAPI, suspenderUsuarioAPI } from "../../../helpers/usuario.queries";
import Swal from "sweetalert2";

const FilaUsuario = ( {usuario, setUsuarios, token} ) => {

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
        const respuesta = await borrarUsuarioAPI(usuario._id, token);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario Eliminado",
            text: `El usuario "${usuario.nombreUsuario}" fue eliminado correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI(token);
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

  const suspenderUsuario = async () => {
    const confirmText = usuario.habilitado ? "Suspender" : "Habilitar"; 
    const icon = usuario.habiliatdo ? "bi bi-dash-circle" : "bi bi-check-lg";
    Swal.fire({
      title: `¿Estás seguro de ${confirmText} el usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta;
        if (usuario.habilitado) {
          respuesta = await suspenderUsuarioAPI(usuario._id, token); 
        } else {
          respuesta = await levantarSuspensionUsuarioAPI(usuario._id, token);
        }
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario Actualizado",
            text: `El usuario "${usuario.nombreUsuario}" se acaba de ${confirmText.toLowerCase()} correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI(token);
          setUsuarios(listaUsuarios);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `No se pudo ${confirmText.toLowerCase()} el usuario "${usuario.nombreUsuario}". Intente realizar esta operación en unos minutos`,
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
            <td><Badge>{usuario.rol}</Badge></td>
            <td><Badge bg={usuario.habilitado ? "success" : "danger"}>
          {usuario.habilitado ? "Habilitado" : "Suspendido"}
        </Badge></td>
            <td className="text-center">
            <Button className="btn btn-dark" onClick={suspenderUsuario} disabled={usuario.rol === 'admin'}>
          <i className={usuario.habilitado ? "bi bi-dash-circle" : "bi bi-check-lg"}></i>
        </Button>
              <Button variant="danger" className="ms-lg-1 mt-lg-0" onClick={borrarUsuario} disabled={usuario.rol === 'admin'}>
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
    );
};

export default FilaUsuario;