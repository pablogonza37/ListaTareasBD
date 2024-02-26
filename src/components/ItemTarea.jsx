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
        className="overflow-auto"
      />
      <Button variant="danger" onClick={() => borrarTarea(nombreTarea)}>
      <i className="bi bi-trash"></i>
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;

