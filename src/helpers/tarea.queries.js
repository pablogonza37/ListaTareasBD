const URL_Tareas = import.meta.env.VITE_API_TAREAS;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmFjMTZhOGEyNDZkYzMwODk5ZDNlMTYiLCJlbWFpbCI6InBhYi5wZzkyQGdtYWlsLmNvbSIsInJvbCI6InVzdWFyaW8iLCJoYWJpbGl0YWRvIjp0cnVlLCJpYXQiOjE3MjI1NjQyMDcsImV4cCI6MTcyMjU3NTAwN30.EcH8dNMtYdxj-9-YdPdRUe4I6MLaexzWDmQ0hCt76a8'; 
export const leerTareasAPI = async () => {
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
  
  export const agregarTareasAPI = async (tareaNueva) => {
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

  export const borrarTareaAPI = async (id) => {
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
  

  export const obtenerTareaAPI = async (id) => {
  
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
  


export const editarTareaAPI = async (tareaEditada, id) => {
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
