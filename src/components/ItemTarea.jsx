import React, { useState } from "react";
import { Button, ListGroup, Form, FormLabel } from "react-bootstrap";
import {
  borrarTareaAPI,
  editarTareaAPI,
  leerTareasAPI,
  obtenerTareaAPI,
} from "../helpers/queries";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ItemTarea = ({ tareaAgregada, setTareas, idTarea }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [editando, setEditando] = useState(false);

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
      const respuesta = await obtenerTareaAPI(id);
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
    const tarea ={
      tarea: tareaEditada.tarea,
      realizada: tareaAgregada.realizada
    }
    setEditando(false);
    try {
      const respuesta = await editarTareaAPI(tarea, idTarea);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Tarea modificado!",
          text: `La tarea fue modificada correctamente`,
          icon: "success",
        });
      }
      const listaTareas = await leerTareasAPI();
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

  const borrarTarea = async (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar la tarea?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarTareaAPI(id);
        if (respuesta.status === 200) {
          const listaTareas = await leerTareasAPI();
          setTareas(listaTareas);
          Swal.fire({
            title: "Tarea eliminada",
            text: `La tarea fue eliminada correctamente`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `La tarea no pudo ser eliminada. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  const tareaRealizada = async ()=>{
    const tarea ={
      tarea: tareaAgregada.tarea,
      realizada: true
    }
    try {
      const respuesta = await editarTareaAPI(tarea, idTarea);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Tarea realizada!",
          icon: "success",
        });
      }
      const listaTareas = await leerTareasAPI();
      setTareas(listaTareas);
    } catch (error) {
      console.error("Error al marcar como realizada", error);
      Swal.fire({
        title: "Ocurrió un error",
        text: "La tarea no pudo ser marcada como realizada. Por favor, inténtelo de nuevo más tarde.",
        icon: "error",
      });
    }
  }

  return (
    <section className="">
      <Form onSubmit={handleSubmit(handleGuardarEdicion)}>
        <ListGroup.Item className=" rounded d-flex justify-content-between my-1" >
          {!editando ? (
            <FormLabel className="overflow-auto lead" onClick={tareaRealizada}>{tareaAgregada.tarea}</FormLabel>
          ) : (
            <Form.Control
              type="text"
              id='editarTarea'
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
          <Button variant='' onClick={toggleMenu}><i className="bi bi-three-dots-vertical" ></i></Button>
        </ListGroup.Item>
        <Form.Text className="text-warning">{errors.tarea?.message}</Form.Text>

        {menuVisible && (
          <div className="d-flex justify-content-end">
            {!editando ? (
              <Button
                variant="warning"
                className="mx-1"
                onClick={() => {
                  setEditando(true);
                  cargarDatosTarea(idTarea);
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </Button>
            ) : (
              <Button variant="success" className="mx-1" type="submit">
                <i className="bi bi-check"></i>
              </Button>
            )}
            <Button variant="danger" onClick={() => borrarTarea(idTarea)}>
              <i className="bi bi-trash "></i>
            </Button>
          </div>
        )}
      </Form>
    </section>
  );
};

export default ItemTarea;
