import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoItem, useTodos } from '../context/TodoContext';

const EditTodoPage: React.FC = () => {
    const { id } = useParams();
    const { todos, updateTodo } = useTodos();
    const todo = todos.find((t) => t.id === Number(id));
    const [todoItem, setTodo] = useState<TodoItem | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (todo) setTodo(todo);
    }, [todo]);

    const handleEditTodo = (todo: TodoItem) => {
    if (todoItem) {
        updateTodo(todoItem?.id!, todo);  // ใช้ todoItem id
        navigate("/");  // ไปที่หน้า Home หรือหน้าหลักหลังจากแก้ไข
    }
    };

    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Todo</h1>
            <TodoForm onSubmit={handleEditTodo} initialData={todoItem!} />
        </div>
    );
};

export default EditTodoPage;
