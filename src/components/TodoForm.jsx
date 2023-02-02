import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

function TodoForm() {
  const { dispatch } = useTodoContext();
  const [todo, setTodo] = useState({ taskname: "", priority: "" });
  const [error, setError] = useState("");
  const [emptyfields, setEmptyfields] = useState([]);
  const { taskname, priority } = todo;
  const { user } = useAuthContext();
  const onChange = (e) => {
    setTodo((prevstate) => ({ ...prevstate, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch("/api/todos/", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.message);
      setError(json.fields);
    }
    if (response.ok) {
      setTodo({ taskname: "", priority: "" });
      setError(null);
      setEmptyfields([]);
      console.log("new task created");
      dispatch({ type: "CREATE_TODOS", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new task</h3>
      <label>task name</label>
      <input
        type="text"
        value={taskname}
        id="taskname"
        onChange={onChange}
        className={emptyfields.includes("taskname") ? "error" : ""}
      />

      <label>Priority</label>
      <input
        type="text"
        value={priority}
        id="priority"
        onChange={onChange}
        className={emptyfields.includes("priority") ? "error" : ""}
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default TodoForm;
