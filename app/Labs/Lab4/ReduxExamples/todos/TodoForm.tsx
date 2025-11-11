// app/Labs/Lab4/ReduxExamples/todos/TodoForm.tsx

"use client";
import { InputGroup, FormControl, Button, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>

      <InputGroup>
       
        <FormControl
          value={todo.title}
          placeholder="Learn Mongo"
          onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          className="me-2"
        />

       
        <Button
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          variant="warning" 
          className="me-2"
        >
          Update
        </Button>
        <Button
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
          variant="success"
          className="me-2"
        >
          Add
        </Button>
      </InputGroup>
    </ListGroupItem>
  );
}