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
  actualizarFotoPerfilAPI,
} from "../../../helpers/usuario.queries";

const PerfilUsuario = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [editando, setEditando] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
          setFotoPerfil(usuarioEncontrado.imagenPerfil);
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
        id: usuarioLogueado.id,
        habilitado: usuarioLogueado.habilitado,
        token: usuarioLogueado.token,
      };
      setUsuario(usuarioActualizado);

      sessionStorage.setItem(
        "usuarioTareaFacil",
        JSON.stringify(usuarioActualizado)
      );
      setUsuarioLogueado(usuarioActualizado);
    } else {
      Swal.fire({
        title: "Ocurrio un error!",
        text: `El perfil no pudo ser modificado. Intente esta operacion en unos minutos`,
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



 

  const handleFotoPerfilChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("imagenPerfil", file);

      try {
        const respuesta = await actualizarFotoPerfilAPI(
          formData,
          usuarioLogueado.token
        );

        if (respuesta.status === 200) {
          const usuarioActualizado = await respuesta.json();
          setFotoPerfil(usuarioActualizado);
          const usuarioConFotoActualizada = {
            ...usuarioLogueado,
            imagenPerfil: fotoPerfil,
          };
         
          sessionStorage.setItem(
            "usuarioTareaFacil",
            JSON.stringify(usuarioConFotoActualizada)
          );
         
console.log(usuarioActualizado)
          Swal.fire({
            title: "Foto de perfil actualizada!",
            text: `La foto de perfil fue actualizada correctamente`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ocurrio un error!",
            text: `La foto de perfil no pudo ser actualizada. Intente de nuevo más tarde.`,
            icon: "error",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Ocurrio un error!",
          text: `La foto de perfil no pudo ser actualizada. Intente de nuevo más tarde.`,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Card className="my-5 p-4">
        <Row>
          <Col md={6}>
            <div className="d-flex justify-content-center mt-4 position-relative">
              <Card.Img
                variant="top"
                src={fotoPerfil}
                className="imagenPerfil shadow"
              />
              <Button
                variant="light"
                className="position-absolute mb-1 bottom-0 end-60 btnEditarFotoPerfil"
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFotoPerfilChange}
                  id="fotoPerfilInput"
                />
                <label
                  htmlFor="fotoPerfilInput"
                  className="d-inline-block mb-0"
                >
                  <i className="bi bi-pencil-square"></i>
                </label>
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
                 <strong>Nombre de Usuario: </strong>{usuario.nombreUsuario}
                </ListGroup.Item>
                <ListGroup.Item><strong>Email: </strong>{usuario.email}</ListGroup.Item>
                <ListGroup.Item><strong>Rol: </strong>{usuario.rol}</ListGroup.Item>
                <ListGroup.Item><strong>Genero: </strong>{usuario.genero}</ListGroup.Item>
                <ListGroup.Item>
                <strong>Fecha de nacimiento: </strong>{usuario.fechaNacimiento}
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

            <Form.Group className="mb-2" controlId="formGenero">
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

            <Form.Group className="mb-2" controlId="formFechaNacimiento">
              <Form.Label>Fecha de Nacimiento:</Form.Label>
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
