import React from 'react';
import TodoForm from '../components/TodoForm';
import { TodoItem, useTodos } from '../context/TodoContext';
import { useNavigate } from 'react-router-dom';

const AddTodoPage: React.FC = () => {
    const { addTodo } = useTodos();
    const navigate = useNavigate();
    const handleAddTodo = (todo: TodoItem) => {
        // console.log('Adding new Todo:', todo);

        addTodo(todo);
        navigate("/");
        // Call API or update state here
    };

    return (
        <div>
            <h1>Add Todo</h1>
            <TodoForm onSubmit={handleAddTodo} />
        </div>
    );
};

export default AddTodoPage;
