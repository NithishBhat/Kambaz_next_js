import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    // Added container-fluid for better spacing
    <div id="wd-working-with-arrays" className="container-fluid">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      {/* Used d-flex for better alignment */}
      <div className="d-flex">
        <FormControl
          id="wd-todo-id"
          value={todo.id} // Use value for controlled component
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-retrieve-todo-by-id"
          className="btn btn-primary text-nowrap" // Added text-nowrap
          href={`${API}/${todo.id}`}
        >
          Get Todo by ID
        </a>
      </div>
      <hr />

      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-create-todo" // Changed id to be unique
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      <h3>Removing from an Array</h3>
      <div className="d-flex">
        <FormControl
          value={todo.id} // Use value for controlled component
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-remove-todo"
          className="btn btn-primary text-nowrap" // Added text-nowrap
          href={`${API}/${todo.id}/delete`}
        >
          Remove Todo with ID = {todo.id}
        </a>
      </div>
      <hr />

      <h3>Updating an Item in an Array (Title)</h3>
      {/* Cleaned up floats with d-flex */}
      <div className="d-flex align-items-center">
        <FormControl
          value={todo.id} // Use value
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl
          value={todo.title} // Use value
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a
          href={`${API}/${todo.id}/title/${todo.title}`}
          className="btn btn-primary text-nowrap"
        >
          Update Title
        </a>
      </div>
      <br />
      <hr />

      {/* --- NEW UI FOR 5.2.4.7: UPDATING DESCRIPTION --- */}
      <h3>Updating Description</h3>
      <div className="d-flex align-items-center">
        <FormControl
          value={todo.id}
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl
          as="textarea" // Use textarea for description
          value={todo.description}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <a
          href={`${API}/${todo.id}/description/${todo.description}`}
          className="btn btn-primary text-nowrap"
        >
          Update Description
        </a>
      </div>
      <br />
      <hr />

      {/* --- NEW UI FOR 5.2.4.7: UPDATING COMPLETED --- */}
      <h3>Updating Completed Status</h3>
      <div className="d-flex align-items-center">
        <FormControl
          value={todo.id}
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <div className="form-check me-2">
          <input
            id="wd-todo-completed"
            className="form-check-input"
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="wd-todo-completed">
            Completed
          </label>
        </div>
        <a
          href={`${API}/${todo.id}/completed/${todo.completed}`}
          className="btn btn-primary text-nowrap"
        >
          Update Completed
        </a>
      </div>
      <br />
      <hr />
    </div>
  );
}