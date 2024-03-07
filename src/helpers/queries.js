const URL_Tareas = import.meta.env.VITE_API_TAREAS;

export const leerTareasAPI = async () => {
    try {
      const respuesta = await fetch(URL_Tareas);
      const listaTareas = await respuesta.json();
      console.log(listaTareas);
      return listaTareas;
    } catch (error) {
      console.log(error);
    }
  };
  
  