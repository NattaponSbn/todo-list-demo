// src/pages/TodoListPage.tsx
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

const TodoListPage = () => {
  const { todos, deleteTodo } = useTodos();

  return (
    <div className="p-6 max-w-md mx-auto border shadow rounded bg-white">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex justify-between mb-4">
        <div>
          <h5 className="font-bold mb-1">My Tasks</h5>
          <p className="text-xs text-muted">You have 1 tasks left!</p>
        </div>
        <div className="flex items-center">
        <Link to="/manage/add" className="bg-primary text-white text-sm px-8 py-2 border rounded">
          Add Task
        </Link>
        </div>
       
      </div>
     
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-2 p-2 rounded"
          >
            <span>{todo.title}</span>
            <div className="space-x-2">
              <Link
                to={`/manage/${todo.id}/edit`}
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
        {todos.length === 0 && <p>No Datas</p>}
      </ul>
    </div>
  );
};

export default TodoListPage;
