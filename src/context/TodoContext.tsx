// src/context/TodoContext.tsx
import { createContext, useContext, useState } from "react";

export interface TodoItem {
    id?: number;
    title: string; 
    description: string
}

type TodoContextType = {
  todos: TodoItem[];
  addTodo: (item: TodoItem) => void;
  updateTodo: (id: number, item: TodoItem) => void;
  deleteTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (item: TodoItem) =>
    setTodos((prev) => [...prev, { id: Date.now(), title: item.title, description: item.description }]);

  const updateTodo = (id: number, item: TodoItem) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title: item.title, description: item.description } : t)));

  const deleteTodo = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
};
