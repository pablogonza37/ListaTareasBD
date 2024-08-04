import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import React, { useState } from "react";
import { crearUsuarioAPI } from "../../../helpers/usuario.queries";

const RegistrarUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const usuario = {
      nombreUsuario: data.nombreUsuario,
      email: data.email,
      contrasenia: data.contrasenia,
    };
    
    const respuesta = await crearUsuarioAPI(usuario);
    if (respuesta.status === 400) {
      Swal.fire({
        title: "Error",
        text: "Ya existe un usuario con este correo electrónico",
        icon: "error",
      });
      return;
    }

    if (respuesta.status === 201) {
      Swal.fire({
        title: "Usuario registrado",
        text: `El usuario "${usuario.nombreUsuario}" fue registrado correctamente`,
        icon: "success",
      });
      reset();
      if (!usuarioLogueado) {
        navegacion("/login");
      }
      
    } else {
      Swal.fire({
        title: "Ocurrió un error",
        text: `El usuario "${usuario.nombreUsuario}" no pudo ser registrado. Intente esta operación en unos minutos`,
        icon: "error",
      });
    }
  }
  

  const contrasenia = watch("contrasenia", "");

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
     
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4" controlId="formNombre">
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                {...register("nombreUsuario", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 2,
                    message:
                      "Debe ingresar como mínimo 2 caracteres para el nombre de usuario.",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "Debe ingresar como máximo 50 caracteres para el nombre de usuario.",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreUsuario && errors.nombreUsuario.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "El email ingresado no es válido",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email && errors.email.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                {...register("contrasenia", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.contrasenia && errors.contrasenia.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirmar Contraseña"
                {...register("confirmarContraseña", {
                  validate: (value) =>
                    value === contrasenia || "Las contraseñas no coinciden",
                })}
              />
              <Form.Text className="text-danger">
                {errors.confirmarContraseña &&
                  errors.confirmarContraseña.message}
              </Form.Text>
            </Form.Group>
            <div>
              <Button type="submit" variant="success">
                Registrar
              </Button>
            </div>
          </Form>
        
    </div>
  );
};

export default RegistrarUsuario;
