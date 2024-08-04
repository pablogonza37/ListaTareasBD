const URL_Tareas = import.meta.env.VITE_API_TAREAS;

export const leerTareasAPI = async (token) => {
  try {
    const respuesta = await fetch(URL_Tareas, {
      method: 'GET', 
      headers: {
        'Authorization': `${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    }

    const listaTareas = await respuesta.json();
    return listaTareas;
  } catch (error) {
    console.log('Error:', error);
  }
};
  
  export const agregarTareasAPI = async (tareaNueva, token) => {
    try {
      const respuesta = await fetch(URL_Tareas, {
        method: "POST",
        headers: {
          'Authorization': `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaNueva),
      });
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  export const borrarTareaAPI = async (id, token) => {
    try {
      const respuesta = await fetch(`${URL_Tareas}/${id}`, {
        method: 'DELETE', 
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json' 
        }
      });
  
      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }
  
      return respuesta;
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  export const obtenerTareaAPI = async (id, token) => {
  
    try {
      const respuesta = await fetch(`${URL_Tareas}/${id}`, {
        method: 'GET', 
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json' 
        }
      });
      
      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }
      return respuesta;
    } catch (error) {
      console.log('Error:', error);
      
    }
  };
  


export const editarTareaAPI = async (tareaEditada, id, token) => {
  try {
    const respuesta = await fetch(`${URL_Tareas}/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaEditada),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
