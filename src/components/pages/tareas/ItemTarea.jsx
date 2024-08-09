import React, { useState } from "react";
import { Button, ListGroup, Form, FormLabel } from "react-bootstrap";
import {
  borrarTareaAPI,
  editarTareaAPI,
  leerTareasAPI,
  obtenerTareaAPI,
} from "../../../helpers/tarea.queries";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ItemTarea = ({ tareaAgregada, setTareas, idTarea, token }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [editando, setEditando] = useState(false);
  const [tareaRealizada, setTareaRealizada] = useState(tareaAgregada.realizada);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const cargarDatosTarea = async (id) => {
    try {
      const respuesta = await obtenerTareaAPI(id, token);
      console.log(respuesta.status);
      if (respuesta.status === 200) {
        const tareaEncontrada = await respuesta.json();
        setValue("tarea", tareaEncontrada.tarea);
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuardarEdicion = async (tareaEditada) => {
    const tarea = {
      tarea: tareaEditada.tarea,
      realizada: tareaAgregada.realizada,
    };
    setEditando(false);
    try {
      const respuesta = await editarTareaAPI(tarea, idTarea, token);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Tarea modificada!",
          text: `La tarea fue modificada correctamente`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      const listaTareas = await leerTareasAPI(token);
      setTareas(listaTareas);
      reset();
      setMenuVisible(false);
    } catch (error) {
      console.error("Error al editar tarea:", error);
      Swal.fire({
        title: "Ocurrió un error",
        text: "La tarea no pudo ser editada. Por favor, inténtelo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  const borrarTarea = async (id, tokenUsuario) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la tarea?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarTareaAPI(id, tokenUsuario);
        if (respuesta.status == 200) {
          const listaTareas = await leerTareasAPI(tokenUsuario);
          setTareas(listaTareas);
          Swal.fire({
            title: "Tarea eliminada",
            text: `La tarea fue eliminada correctamente`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `La tarea no pudo ser eliminada. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  const handleTareaRealizada = async () => {
    const nuevaRealizada = !tareaRealizada;
    const tarea = {
      tarea: tareaAgregada.tarea,
      realizada: nuevaRealizada,
    };
    try {
      const respuesta = await editarTareaAPI(tarea, idTarea, token);
      if (respuesta.status === 200) {
        Swal.fire({
          title: nuevaRealizada ? "¡Tarea realizada!" : "¡Tarea desmarcada!",
          icon: "success",
        });
        setTareaRealizada(nuevaRealizada);
      }
      const listaTareas = await leerTareasAPI(token);
      setTareas(listaTareas);
    } catch (error) {
      console.error("Error al cambiar el estado de realizada", error);
      Swal.fire({
        title: "Ocurrió un error",
        text: "El estado de la tarea no pudo ser cambiado. Por favor, inténtelo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <section>
      <Form onSubmit={handleSubmit(handleGuardarEdicion)}>
        <ListGroup.Item
          className={`rounded d-flex justify-content-between my-1 ${
            tareaRealizada ? "text-decoration-line-through" : ""
          }`}
        >
          {!editando ? (
            <FormLabel className="overflow-auto lead pt-2">
              {tareaRealizada ? (
                <i
                  className="bi bi-check-circle text-success me-3"
                  onClick={handleTareaRealizada}
                ></i>
              ) : (
                <i
                  className="bi bi-circle me-3"
                  onClick={handleTareaRealizada}
                ></i>
              )}
              {tareaAgregada.tarea}
            </FormLabel>
          ) : (
            <Form.Control
              type="text"
              id="editarTarea"
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
          )}
          <Button variant="" onClick={toggleMenu}>
            <i className="bi bi-three-dots-vertical"></i>
          </Button>
        </ListGroup.Item>
        <Form.Text className="text-warning">{errors.tarea?.message}</Form.Text>

        {menuVisible && (
          <div className="d-flex justify-content-end bg-white">
            {!editando ? (
              <>
                <Button variant="">Info</Button>
                <Button
                  variant=""
                  className="mx-1 border border-0"
                  onClick={() => {
                    setEditando(true);
                    cargarDatosTarea(idTarea);
                  }}
                  disabled={tareaRealizada}
                >
                  Editar
                </Button>
              </>
            ) : (
              <Button variant="" className="mx-1" type="submit">
                Guardar
              </Button>
            )}
            <Button variant="" onClick={() => borrarTarea(idTarea, token)}>
              Eliminar
            </Button>
          </div>
        )}
      </Form>
    </section>
  );
};

export default ItemTarea;
