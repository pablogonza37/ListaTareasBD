import { Button, Card, Form, Col, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { iniciarSesion } from "../../../helpers/usuario.queries";
import { leerTareasAPI } from "../../../helpers/tarea.queries";
import Logo from "../../../assets/logoTareaFacil.png";

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
    if(usuario.habilitado === false){

    }
    const respuesta = await iniciarSesion(usuario);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      if(datos.habilitado === false){
        Swal.fire({
          title: "Usuario suspendido",
          text: "Tu cuenta está suspendida. No puedes iniciar sesion.",
          icon: "warning",
        });
      }else{
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
        showConfirmButton: false,
        timer: 1500,
      });
      await leerTareasAPI(datos.token);
      onHide();
      setUsuarioLogueado(datos);
    }
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
    <>
    <div className="d-flex justify-content-center mb-5">
        <img src={Logo} alt="" width={150} />
      </div>
    <section className="mt-5 d-flex justify-content-center">
      
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <span className="input-span">
        <label htmlFor="email" className="label">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: "Email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </span>
      <span className="input-span">
        <label htmlFor="password" className="label">Contraseña:</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("contrasenia", {
            required: "Contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          className={`form-control ${errors.contrasenia ? 'is-invalid' : ''}`}
        />
        {errors.contrasenia && <div className="invalid-feedback">{errors.contrasenia.message}</div>}
      </span>
      <span className="span">
        <a href="#">Olvidaste la contraseña?</a>
      </span>
      <Button className="submit" variant="success" type="submit">
        INGRESAR
      </Button>
      <span className="span">
        No tienes cuenta? <Link to="/registro">Registrar</Link>
      </span>
    </form>
        </section>
        </>
  );
};

export default InicioSesion;
