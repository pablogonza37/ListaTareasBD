const URL_Tareas = import.meta.env.VITE_API_TAREAS;

export const leerTareasAPI = async () => {
    try {
      const respuesta = await fetch(URL_Tareas);
      const listaTareas = await respuesta.json();
      return listaTareas;
    } catch (error) {
      console.log(error);
      console.log(listaTareas)
    }
  };
  
  export const agregarTareasAPI = async (tareaNueva) => {
    try {
      const respuesta = await fetch(URL_Tareas, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaNueva),
      });
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  export const borrarTareaAPI = async(id)=>{
    try{
      const respuesta = await fetch(`${URL_Tareas}/${id}`,{
        method: "DELETE" });
      return respuesta;
    }catch(error){
      console.log(error)
    }
  }

  export const obtenerTareaAPI = async (id) => {
  try {
    const respuesta = await fetch(URL_Tareas + "/" + id);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};


export const editarTareaAPI = async (tareaEditada, id) => {
  try {
    const respuesta = await fetch(`${URL_Tareas}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaEditada),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
