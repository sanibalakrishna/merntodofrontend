import React, { useState, useEffect } from "react";
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";
function Home() {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };
    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="todos">
        {todos &&
          todos.map((todo) => <TodoDetails key={todo._id} todo={todo} />)}
      </div>
      <TodoForm />
    </div>
  );
}

export default Home;
