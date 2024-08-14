import { Form, Button, Spinner } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import {
  agregarTareasAPI,
  leerTareasAPI,
} from "../../../helpers/tarea.queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormularioTareas = ({
  usuarioLogueado,
  handleShowLoginModal,
  setUsuarioLogueado,
}) => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!usuarioLogueado) {
      handleShowLoginModal();
      setMostrarSpinner(false);
    } else {
      consultarAPI();
    }
  }, [usuarioLogueado]);

  const consultarAPI = async () => {
    try {
      setMostrarSpinner(true);
      const respuesta = await leerTareasAPI(usuarioLogueado.token);
      if (respuesta === 498) {
        Swal.fire({
          title: "Sesión expirada!",
          text: `Por favor vuelva a iniciar sesión`,
          icon: "error",
        });
        setUsuarioLogueado("");
        navegacion("/");
      }
      setTareas(respuesta);
      setError(null);
      setMostrarSpinner(false);
    } catch (error) {
      console.log(error);
      setError("Error al cargar las tareas desde la API");
      setMostrarSpinner(false);
    }
  };

  const tareaValidada = async (tareaNueva) => {
    if (!usuarioLogueado) {
      navegacion("/");
    }
    const tarea = {
      tarea: tareaNueva.tarea,
      realizada: false,
    };
    try {
      const respuesta = await agregarTareasAPI(tarea, usuarioLogueado.token);
      if (respuesta === 498) {
        Swal.fire({
          title: "Sesión expirada!",
          text: `Por favor vuelva a iniciar sesión`,
          icon: "error",
        });
        setUsuarioLogueado("");
        navegacion("/");
      }
      if (respuesta.status === 201) {
        const listaTareas = await leerTareasAPI(usuarioLogueado.token);

        setTareas(listaTareas);
        setError(null);
        reset();
        Swal.fire({
          title: "Tarea creada!",
          text: `La tarea fue creada correctamente`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Ocurrio un error!",
          text: `La tarea no pudo ser creada. Intente esta opercion en unos minutos`,
          icon: "error",
        });
      }
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
      {!usuarioLogueado && (
        <div className="alert alert-info mt-3">
          Por favor, inicia sesión para ver tus tareas.
        </div>
      )}
      {!error && tareas.length === 0 && (
        <div className="alert alert-info mt-3">No hay tareas.</div>
      )}
      {tareas.length > 0 && (
        <div>
          <ListaTareas
            tareas={tareas}
            error={error}
            setTareas={setTareas}
            token={usuarioLogueado.token}
          ></ListaTareas>
        </div>
      )}
    </div>
  );

  return (
    <section className="mt-5">
      <Form onSubmit={handleSubmit(tareaValidada)}>
        <Form.Group className="d-flex flex-column flex-lg-row">
          <Form.Control
            className="input"
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
                value: 40,
                message: "La tarea debe tener como máximo 40 caracteres",
              },
            })}
          />
          <div className="d-flex justify-content-center">
            <button className="button mt-3 m-lg-0 ms-lg-2"> + Agregar</button>
          </div>
        </Form.Group>

        <Form.Text className="text-warning">{errors.tarea?.message}</Form.Text>
      </Form>

      <hr className="text-light" />
      {error && <div className="alert alert-info mt-3">{error}</div>}
      {mostrarComponente}
    </section>
  );
};

export default FormularioTareas;
