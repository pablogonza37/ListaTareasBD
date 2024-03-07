import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({ tareas, borrarTarea }) => {

  return (
    <ListGroup className='my-4'>
      {tareas.map((tarea) => (
        <ItemTarea
          idTarea={tarea.id}
          key={tarea.id}
          nombreTarea={tarea.tarea}
          borrarTarea={borrarTarea}
        ></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
