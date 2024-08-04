const URL_Usuarios = import.meta.env.VITE_API_USUARIOS;
const URL_Suspender = import.meta.env.VITE_API_SUSPENDER;
const URL_Levantar = import.meta.env.VITE_API_LEVANTAR;
const URL_InicioSesion= import.meta.env.VITE_API_INICIOSESION;

export const crearUsuarioAPI = async (usuarioNuevo) => {
    try {
      const resp = await fetch(URL_Usuarios, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioNuevo),
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const leerUsuariosAPI = async (token) => {
    try {
      const resp = await fetch(URL_Usuarios, {
        method: 'GET', 
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json' 
        }
      });

      if (!resp.ok) {
        throw new Error('No se pudo cargar la lista de usuarios');
      }
      const listaUsuarios = await resp.json();
      return listaUsuarios;
    } catch (error) {
      throw new Error('Error al cargar los usuarios desde la API: ' + error.message);
    }
  };

  export const obtenerUsuarioAPI = async (id, token) => {
    try {
      const resp = await fetch(`${URL_Usuarios}/${id}`, {
        method: 'GET', 
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json' 
        }
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const borrarUsuarioAPI = async (id, token) => {
    try {
      const resp = await fetch(`${URL_Usuarios}/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json' 
          }
  
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const suspenderUsuarioAPI = async (id, token) => {
    try {
      const resp = await fetch(`${URL_Suspender}/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `${token}`, 
          "Content-Type": "application/json",
        },
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const levantarSuspensionUsuarioAPI = async (id, token) => {
    try {
      const resp = await fetch(`${URL_Levantar}/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `${token}`, 
          "Content-Type": "application/json",
        },
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const iniciarSesion = async (usuario) =>{
    try {
      const respuesta = await fetch(URL_InicioSesion, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      return  respuesta
    } catch (error) {
      console.log("errores en el inicio de sesion");
      return;
    }
  }