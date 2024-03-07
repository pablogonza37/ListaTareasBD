import { Button, ListGroup, Form, FormLabel } from "react-bootstrap";

const ItemTarea = ({ nombreTarea, borrarTarea }) => {
 
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <FormLabel className="overflow-auto">{nombreTarea}</FormLabel>
      <Button variant="danger" onClick={() => borrarTarea(nombreTarea)}>
      <i className="bi bi-trash"></i>
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;

