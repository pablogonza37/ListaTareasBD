const URL_Usuarios = import.meta.env.VITE_API_USUARIOS;

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

  export const leerUsuariosAPI = async () => {
    try {
      const resp = await fetch(URL_Usuarios);
      if (!resp.ok) {
        throw new Error('No se pudo cargar la lista de usuarios');
      }
      const listaUsuarios = await resp.json();
      return listaUsuarios;
    } catch (error) {
      throw new Error('Error al cargar los usuarios desde la API: ' + error.message);
    }
  };