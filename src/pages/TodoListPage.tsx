// src/pages/TodoListPage.tsx
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

const TodoListPage = () => {
  const { todos, deleteTodo } = useTodos();

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded">
        + Add Todo
      </Link>
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{todo.title}</span>
            <div className="space-x-2">
              <Link
                to={`/edit/${todo.id}`}
                className="text-yellow-600 underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTodo(todo.id!)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {todos.length === 0 && <p>No todos yet</p>}
      </ul>
    </div>
  );
};

export default TodoListPage;
