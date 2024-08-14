import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import React from "react";
import { crearUsuarioAPI } from "../../../helpers/usuario.queries";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logoTareaFacil.png";

const RegistrarUsuario = () => {
  const navegacion = useNavigate();
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
      genero: data.genero,
      fechaNacimiento: data.fechaNacimiento,
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
      navegacion("/");
    } else {
      Swal.fire({
        title: "Ocurrió un error",
        text: `El usuario "${usuario.nombreUsuario}" no pudo ser registrado. Intente esta operación en unos minutos`,
        icon: "error",
      });
    }
  };

  const contrasenia = watch("contrasenia", "");

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <img src={Logo} alt="" width={150} />
      </div>

      <section className="d-flex justify-content-center mb-5">
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <span className="input-span">
            <Form.Group className="mb-2" controlId="formNombre">
              <Form.Label className="label">Nombre de usuario:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
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
          </span>

          <span className="input-span">
            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label className="label">Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
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
          </span>

          <span className="input-span">
            <Form.Group className="mb-2" controlId="formGenero">
              <Form.Label className="label">Genero:</Form.Label>
              <Form.Select
                type="select"
                {...register("genero", {
                  required: "El genero es obligatorio",
                })}
              >
                <option value="">Selecciona un género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no_binario">No Binario</option>
                <option value="otro">Otro</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.genero && errors.genero.message}
              </Form.Text>
            </Form.Group>
          </span>

          <span className="input-span">
            <Form.Group className="mb-2" controlId="formFechaNacimiento">
              <Form.Label className="label">Fecha de Nacimiento:</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                {...register("fechaNacimiento", {
                  required: "La fecha de nacimiento es obligatoria",
                })}
              />
              <Form.Text className="text-danger">
                {errors.fechaNacimiento && errors.fechaNacimiento.message}
              </Form.Text>
            </Form.Group>
          </span>
          <span className="input-span">
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label className="label">Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
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
          </span>
          <span className="input-span">
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label className="label">Confirmar Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                {...register("confirmarContrasenia", {
                  required: "La contraseña es obligatoria",
                  validate: (value) =>
                    value === contrasenia || "Las contraseñas no coinciden",
                })}
              />
              <Form.Text className="text-danger">
                {errors.confirmarContrasenia &&
                  errors.confirmarContrasenia.message}
              </Form.Text>
            </Form.Group>
          </span>

          <Button type="submit" className="submit" variant="success">
            REGISTRAR
          </Button>
          <Link className=" submit btn btn-light" to="/" variant="success">
            INICIAR SESION
          </Link>
        </Form>
      </section>
    </>
  );
};

export default RegistrarUsuario;
