import { Table, Button } from "react-bootstrap";
import FilaUsuario from "./FilaUsuario";

const AdministrarUsuarios = () => {
  return (
    <div className="mt-5">
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
        <tbody>
          <FilaUsuario></FilaUsuario>
        </tbody>
      </Table>
    </div>
  );
};

export default AdministrarUsuarios;
