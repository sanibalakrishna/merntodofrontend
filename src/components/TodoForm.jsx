import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

function TodoForm() {

  const { dispatch } = useTodoContext();
  const [taskname, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const [emptyfields, setEmptyfields] = useState([]);

  const { user } = useAuthContext();
  const onChange = (e) => {
    setTaskName(e.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const response = await fetch("https://merntodobackend.vercel.app/api/todos/", {
      method: "POST",
      body: JSON.stringify({taskname,priority}),
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
       setTaskName("");
       setPriority("");
      setError(null);
      setEmptyfields([]);
      console.log("new task created");
      dispatch({ type: "CREATE_TODOS", payload: json });
      console.log(json);
     
    }
  };
  return (
    <div className="create" >
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
      <div className="priority">
        <button className={(priority=="high")&&"high"} onClick={()=>setPriority("high")}>High</button>
        <button className={(priority=="medium")&&"medium"} onClick={()=>setPriority("medium")}>Medium</button>
        <button className={(priority=="low")&&"low"} onClick={()=>setPriority("low")}>Low</button>
      </div>
      <button onClick={handleSubmit} className="submitbtn">Add Task</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default TodoForm;
