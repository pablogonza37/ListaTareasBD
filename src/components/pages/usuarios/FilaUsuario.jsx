import { Table, Button } from "react-bootstrap";

const FilaUsuario = () => {
    return (
        <tr>
            <td>pablo</td>
            <td>pab.pg92@gmail.com</td>
            <td>admin</td>
            <td>true</td>
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