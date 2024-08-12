import { Button, Card, Form, Col, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import { iniciarSesion } from "../../../helpers/usuario.queries";
import { leerTareasAPI } from "../../../helpers/tarea.queries";

const InicioSesion = ({
  show,
  onHide,
  setUsuarioLogueado,
  usuarioLogueado,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (usuario) => {
    const respuesta = await iniciarSesion(usuario);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      sessionStorage.setItem(
        "usuarioTareaFacil",
        JSON.stringify({
          email: datos.email,
          token: datos.token,
          rol: datos.rol,
          nombreUsuario: datos.nombreUsuario,
          habilitado: datos.habilitado,
          imagenPerfil: datos.imagenPerfil,
          id: datos.id,
          genero: datos.genero,
          fechaNacimiento: datos.fechaNacimiento,
        })
      );
      Swal.fire({
        title: "Usuario logueado",
        text: `Bienvenido "${datos.nombreUsuario}"`,
        icon: "success",
      });
      await leerTareasAPI(datos.token);
      onHide();
      setUsuarioLogueado(datos);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "El ususario o password son incorrectos",
        icon: "error",
      });
    }
  };

  const btnRegistrar = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                {...register("contrasenia", {
                  required: "Contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.contrasenia?.message}
              </Form.Text>
            </Col>
          </Form.Group>
          <Button variant="success" type="submit">
            Ingresar
          </Button>
        </Form>
        <p className="mt-3">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" onClick={btnRegistrar}>
            Regístrate aquí
          </Link>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default InicioSesion;
