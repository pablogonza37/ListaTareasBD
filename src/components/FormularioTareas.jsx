import { Form, Button, Spinner } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import {
  agregarTareasAPI,
  borrarTareaAPI,
  leerTareasAPI,
} from "../helpers/queries";
import { useForm } from "react-hook-form";

const FormularioTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
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
      setMostrarSpinner(true);
      const respuesta = await leerTareasAPI();
      setTareas(respuesta);
      setError(null);
      setMostrarSpinner(false);
    } catch (error) {
      console.log(error);
      setError("Error al cargar las tareas desde la API");
      setMostrarSpinner(false);
    }
  };

  const productoValidado = async (tarea) => {
    try {
      setMostrarSpinner(true);
      const respuesta = await agregarTareasAPI(tarea);
      reset();
      consultarAPI();
      setError(null);
      setMostrarSpinner(false);
    } catch (error) {
      console.log(error);
      setMostrarSpinner(false);
    }
  };

  const borrarTarea = async (id) => {
    try {
      const respuesta = await borrarTareaAPI(id);
      consultarAPI();
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarComponente = mostrarSpinner ? (
    <div className="my-4 text-center">
      <Spinner animation="border" variant="success" />
    </div>
  ) : (
    <div>
      {!error && tareas.length === 0 && (
        <div className="alert alert-info mt-3">No hay tareas.</div>
      )}
      {tareas.length > 0 && (
        <div>
          <ListaTareas
            tareas={tareas}
            borrarTarea={borrarTarea}
            error={error}
          ></ListaTareas>
        </div>
      )}
    </div>
  );

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
                message: "La tarea debe tener como mínimo 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "La tarea debe tener como máximo 50 caracteres",
              },
            })}
          />

          <Button variant="success" className="mx-2" type="submit">
            Agregar
          </Button>
        </Form.Group>
        <Form.Text className="text-warning">{errors.tarea?.message}</Form.Text>
      </Form>
      {error && <div className="alert alert-info mt-3">{error}</div>}
      {mostrarComponente}
    </section>
  );
};

export default FormularioTareas;
