import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({ tareas }) => {
  return (
    <ListGroup className='my-4'>
      {tareas.map((tarea) => (
        <ItemTarea
          key={tarea.id}
          nombreTarea={tarea.tarea}
        ></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
