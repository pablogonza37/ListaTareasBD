import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({ tareas, setTareas }) => {

  return (
    <ListGroup className='my-4'>
      {tareas.map((tarea) => (
        <ItemTarea
          key={tarea.id}
          idTarea={tarea.id}
          nombreTarea={tarea.tarea}
          setTareas={setTareas}
        ></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
