import { Button, ListGroup, Form, FormLabel } from "react-bootstrap";
import { borrarTareaAPI } from "../helpers/queries";

const ItemTarea = ({ nombreTarea, idTarea, borrarTarea }) => {

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <FormLabel className="overflow-auto">{nombreTarea}</FormLabel>
      <Button variant="danger" onClick={() => borrarTarea(idTarea)}>
      <i className="bi bi-trash"></i>
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;

