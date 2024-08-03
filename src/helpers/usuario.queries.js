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

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmFjMGI4NWMzNmRiMjg0YWU0MTM5MTQiLCJlbWFpbCI6ImFkbWluQHRhcmVhZmFjaWwuY29tIiwicm9sIjoiYWRtaW4iLCJoYWJpbGl0YWRvIjp0cnVlLCJpYXQiOjE3MjI2NDY2NzAsImV4cCI6MTcyMjY1NzQ3MH0.BZlVTc5dKrpln71fLF10PPwRT6fwHXgH8Hc1PtgDc34'

  export const leerUsuariosAPI = async () => {
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

  export const obtenerUsuarioAPI = async (id) => {
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