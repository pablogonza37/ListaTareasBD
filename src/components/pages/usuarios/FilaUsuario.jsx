import { Table, Button, Badge } from "react-bootstrap";

const FilaUsuario = ( {usuario} ) => {
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
              <Button variant="danger" className="ms-lg-1 mt-lg-0">
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
    );
};

export default FilaUsuario;