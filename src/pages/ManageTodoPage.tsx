import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import { TodoItem, useTodos } from '../context/TodoContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ManageTodoPage: React.FC = () => {
    const { id, action } = useParams();
    const { todos, addTodo, updateTodo } = useTodos();
    const todo = todos.find((t) => t.id === Number(id));
    const [todoItem, setTodo] = useState<TodoItem | null>(null);
    const navigate = useNavigate();

    const isAdd = action === 'add';
    const isEdit = action === 'edit';

    useEffect(() => {
        if (todo) setTodo(todo);
    }, [todo]);

    
    const handleSubmitTodo = (todo: TodoItem) => {
        if(isAdd) handleAddTodo(todo);
        if(isEdit) handleEditTodo(todo);
    };


    const handleAddTodo = (todo: TodoItem) => {
        addTodo(todo);
        navigate("/");
    };

    const handleEditTodo = (todo: TodoItem) => {
        if (todoItem) {
            updateTodo(todoItem?.id!, todo);  // ใช้ todoItem id
            navigate("/");  // ไปที่หน้า Home หรือหน้าหลักหลังจากแก้ไข
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto border shadow rounded bg-white">
            <div className="flex justify-between mb-4">
                <div>
                <h1 className="text-2xl font-bold mb-4">{ isAdd ? 'Add Task' : 'Edit Task' }</h1>
                </div>
                <div className="flex items-center">
                    <Link to="/" className="bg-secondary text-black text-sm px-8 py-2 border border-[#c9c9c9] rounded">
                        Backward
                    </Link>
                </div>

            </div>
            <TodoForm onSubmit={handleSubmitTodo} initialData={todoItem!} />
        </div>
    );
};

export default ManageTodoPage;
