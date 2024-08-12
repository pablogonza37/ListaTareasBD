import { useEffect, useState } from "react";
import { Col, Row, Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  editarUsuarioAPI,
  obtenerUsuarioAPI,
} from "../../../helpers/usuario.queries";

const PerfilUsuario = ({ usuarioLogueado }) => {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [editando, setEditando] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    cargarDatosUsuario();
  }, [show]);

  const cargarDatosUsuario = async () => {
    try {
      const respuesta = await obtenerUsuarioAPI(
        usuarioLogueado.id,
        usuarioLogueado.token
      );

      if (respuesta.status === 200) {
        const usuarioEncontrado = await respuesta.json();

        if (!editando) {
            setUsuario(usuarioEncontrado);
        } else {
            setValue("nombreUsuario", usuarioEncontrado.nombreUsuario);
            setValue("email", usuarioEncontrado.email);
            setValue("genero", usuarioEncontrado.genero);
            setValue("fechaNacimiento", usuarioEncontrado.fechaNacimiento);
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const respuesta = await editarUsuarioAPI(
      data,
      usuarioLogueado.id,
      usuarioLogueado.token
    );
    if (respuesta.status === 200) {
      Swal.fire({
        title: "Perfil modificado!",
        text: `El perfil fue modificado correctamente`,
        icon: "success",
      });
      handleClose();
      reset();
      const usuarioActualizado = {
        ...data,
        rol: usuarioLogueado.rol,
        imagenPerfil: usuarioLogueado.imagenPerfil,
      };
      setUsuario(usuarioActualizado);
    } else {
      Swal.fire({
        title: "Ocurrio un error!",
        text: `El perfil no pudo ser modificado. Intente esta opercion en unos minutos`,
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    setShow(false);
   
  };
  const handleOpen = () => {
    setEditando(true);
    setShow(true);
  };
  return (
    <>
      <Card className="my-5 p-4">
        <Row>
          <Col md={6}>
            <div className="d-flex justify-content-center mt-4 position-relative">
              <Card.Img
                variant="top"
                src={usuario.imagenPerfil}
                className="imagenPerfil"
              />
              <Button
                variant="success"
                className="position-absolute mb-1 bottom-0 end-60 "
              >
                <i className="bi bi-plus-lg fotoPerfil"></i>
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="mb-3 ms-3">
                Perfil{" "}
                <Button variant="" className="p-0" onClick={handleOpen}>
                  <i className="bi bi-pencil-square"></i>
                </Button>
              </Card.Title>

              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Nombre de Usuario: {usuario.nombreUsuario}
                </ListGroup.Item>
                <ListGroup.Item>Email: {usuario.email}</ListGroup.Item>
                <ListGroup.Item>Rol: {usuario.rol}</ListGroup.Item>
                <ListGroup.Item>Genero: {usuario.genero}</ListGroup.Item>
                <ListGroup.Item>
                  Fecha de nacimiento: {usuario.fechaNacimiento}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Modal show={show} onHide={handleClose} size="md">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="formNombre">
              <Form.Label>Nombre de usuario:</Form.Label>
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

            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
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

            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Genero:</Form.Label>
              <Form.Select
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

            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Fecha de Nacimiento:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                {...register("fechaNacimiento", {
                  required: "La fecha de nacimiento es obligatorio",
                })}
              />
              <Form.Text className="text-danger">
                {errors.fechaNacimiento && errors.fechaNacimiento.message}
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" type="submit">
              Guardar
            </Button>

            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PerfilUsuario;
