import React from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

function TodoDetails({ todo }) {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/todos/" + todo._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  return (
    <div className="todo-details">
      <h4>{todo.taskname}</h4>
      <p>
        <strong>priority:</strong>
        {todo.priority}
      </p>
      <p>
        {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default TodoDetails;
