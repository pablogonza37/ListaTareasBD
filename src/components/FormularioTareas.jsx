import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { leerTareasAPI } from "../helpers/queries";

const FormularioTareas = () => {
  const [tareas, setTareas] = useState([]);


  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      const respuesta = await leerTareasAPI();
      console.log(respuesta)
      setTareas(respuesta);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section>
      <Form>
        <Form.Group className="mb-3 d-flex justify-content-between">
          <Form.Control
            id="tareaInput"
            type="text"
            placeholder="Agregar Tarea"
            minLength={3}
            maxLength={50}
            //onChange={(e) => setTarea(e.target.value)}
            //value={tarea}
            required
          />
          <Button variant="primary" className="mx-2" type="submit">
            Agregar
          </Button>
        </Form.Group>
      </Form>
      <ListaTareas tareas={tareas}></ListaTareas>
    </section>
  );
};

export default FormularioTareas;
