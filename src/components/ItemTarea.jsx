import React, { useState } from "react";
import { Button, ListGroup, Form } from "react-bootstrap";

const ItemTarea = ({ nombreTarea, borrarTarea }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <Form.Check
        type="checkbox"
        label={nombreTarea}
        checked={checked}
        onChange={handleCheck}
      />
      <Button variant="danger" onClick={() => borrarTarea(nombreTarea)}>
        Eliminar
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;

