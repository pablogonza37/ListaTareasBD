import { Button, ListGroup } from "react-bootstrap";

const ItemTarea = () => {
    return (
        <ListGroup.Item className="d-flex justify-content-between">Tarea<Button variant="danger" onClick={() => borrarTarea(nombreTarea)}>
        Borrar
      </Button></ListGroup.Item>
    );
};

export default ItemTarea;