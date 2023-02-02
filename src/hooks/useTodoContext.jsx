import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("useTodoContext must be used used an useTodoContextProvider");
  }
  return context;
};
