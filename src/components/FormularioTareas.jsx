import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { agregarTareasAPI, borrarTareaAPI, leerTareasAPI } from "../helpers/queries";
import { useForm } from "react-hook-form";

const FormularioTareas = () => {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();

  
  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      const respuesta = await leerTareasAPI();
      setTareas(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const productoValidado = async (tarea) => {
    const respuesta = await agregarTareasAPI(tarea);
    reset();
    consultarAPI();
  };


  const borrarTarea = async (id) => {
    try {
      const respuesta = await borrarTareaAPI(id);
      consultarAPI();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Form onSubmit={handleSubmit(productoValidado)}>
        <Form.Group className="d-flex justify-content-between">
          <Form.Control
            id="tareaInput"
            type="text"
            placeholder="Agregar Tarea"  
            {...register("tarea", {
              required: "El campo es obligatorio",
              minLength: {
                value: 3,
                message:
                  "La tarea debe tener como minimo 3 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "La tarea debe tener como maximo 50 caracteres",
              },
            })}
          />
          
          <Button variant="success" className="mx-2" type="submit">
            Agregar
          </Button>
        </Form.Group>
        <Form.Text className="text-warning">
            {errors.tarea?.message}
          </Form.Text>
      </Form>
      <ListaTareas tareas={tareas} borrarTarea={borrarTarea}></ListaTareas>
    </section>
  );
};

export default FormularioTareas;
