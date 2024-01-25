import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({ tareas, borrarTarea }) => {
  return (
    <ListGroup>
      {tareas.map((tarea, posicionTarea) => (
        <ItemTarea
          key={posicionTarea}
          nombreTarea={tarea}
          borrarTarea={borrarTarea}
        ></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
