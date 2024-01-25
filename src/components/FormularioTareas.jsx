import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState } from "react";

const FormularioTareas = () => {
const [tarea, setTarea] = useState('');
const [tareas, setTareas] = useState([]);

const handleSubmit = (e)=>{
  e.preventDefault();
  setTareas([...tareas, tarea]);
  setTarea('');
}



  return (
    <section>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 d-flex justify-content-between">
        <Form.Control
          type="text"
          placeholder="Agregar Tarea"
          minLength={3}
          maxLength={50}
          onChange={(e)=> setTarea(e.target.value)} 
          value={tarea}
        />
        <Button variant="primary" className="mx-2" type='submit'>
          Agregar
        </Button>
      </Form.Group>
    </Form>
    <ListaTareas tareas={tareas}></ListaTareas> 
    </section>
    
  );
};

export default FormularioTareas;
