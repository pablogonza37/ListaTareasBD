import { Button, ListGroup, Form, FormLabel } from "react-bootstrap";
import { borrarTareaAPI } from "../helpers/queries";

const ItemTarea = ({ nombreTarea, idTarea, borrarTarea, cargarDatosTarea }) => {

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <FormLabel className="overflow-auto">{nombreTarea}</FormLabel>
      <div>
      <Button variant="warning" className="me-1" onClick={() => cargarDatosTarea(idTarea)}>
      <i className="bi bi-pencil-square"></i>
      </Button>
      <Button variant="danger" onClick={() => borrarTarea(idTarea)}>
      <i className="bi bi-trash "></i>
      </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemTarea;

