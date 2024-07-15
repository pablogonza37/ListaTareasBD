import { Table, Button, Modal } from "react-bootstrap";

const RegistrarUsuario = () => {
    return (
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Registro</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
          <Form
        className="my-4 rounded shadow p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="mb-3" controlId="formNombre">
          <h1 className="display-4 mb-4">{titulo}</h1>
          <hr />
          <Form.Label>Nombre de usuario*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: nombre"
            {...register("nombre", {
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
            {errors.nombre && errors.nombre.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ej: usuario@example.com"
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

        {rolVisible && (
          <Form.Group className="mb-3" controlId="formcategoria">
            <Form.Label>Rol*</Form.Label>
            <Form.Select
              {...register("rol", {
                required: " es obligatorio",
              })}
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.rol?.message}
            </Form.Text>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.password && errors.password.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirmar Contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar Contraseña"
            {...register("confirmarContraseña", {
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          <Form.Text className="text-danger">
            {errors.confirmarContraseña &&
              errors.confirmarContraseña.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="success" disabled={submitting}>
          {submitting ? "Registrando..." : "Registrar"}
        </Button>
      </Form>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
};

export default RegistrarUsuario;