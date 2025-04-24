import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import { TodoItem, useTodos } from '../context/TodoContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { DialogService } from '../core/services/utils/dialog.service';

const ManageTodoPage: React.FC = () => {
    const { id, action } = useParams(); // ใช้สำหรับดึงค่า id และ action จาก URL
    const { todos, addTodo, updateTodo } = useTodos(); // ดึงข้อมูล todos, ฟังก์ชัน addTodo, updateTodo จาก context
    const todo = todos.find((t) => t.id === Number(id)); // หางานที่มี id ตรงกับ id ที่ได้รับจาก params
    const [todoItem, setTodo] = useState<TodoItem | null>(null); // สร้าง state สำหรับเก็บข้อมูล Todo
    const navigate = useNavigate(); // ใช้สำหรับการนำทางไปยังหน้าต่างๆ
    const { t } = useTranslation(); // ใช้สำหรับการแปลข้อความ

    const dialogService = DialogService; // ใช้สำหรับแสดง Dialog

    const isAdd = action === 'add'; // ตรวจสอบว่ากำลังสร้าง Todo ใหม่หรือไม่
    const isEdit = action === 'edit'; // ตรวจสอบว่ากำลังแก้ไข Todo หรือไม่

    // เมื่อค่า todo เปลี่ยนแปลง ให้ตั้งค่าข้อมูล todoItem
    useEffect(() => {
        if (todo) setTodo(todo);
    }, [todo]);

    // ฟังก์ชันนี้จะถูกเรียกเมื่อฟอร์มถูกส่ง
    const handleSubmitTodo = (todo: TodoItem) => {
        if (isAdd) handleAddTodo(todo); // ถ้าเป็นการเพิ่ม Todo ใหม่
        if (isEdit) handleEditTodo(todo); // ถ้าเป็นการแก้ไข Todo ที่มีอยู่
    };

    // ฟังก์ชันสำหรับเพิ่ม Todo ใหม่
    const handleAddTodo = (todo: TodoItem) => {
        console.log(todo, 'todo'); // แสดงข้อมูล Todo ที่จะเพิ่ม
        addTodo(todo); // เรียกฟังก์ชัน addTodo จาก context
        dialogService.successProceed(t); // แสดงข้อความสำเร็จ
        navigate("/"); // นำทางไปหน้าหลัก
    };

    // ฟังก์ชันสำหรับแก้ไข Todo
    const handleEditTodo = (todo: TodoItem) => {
        if (todoItem) {
            updateTodo(todoItem?.id!, todo); // อัพเดต Todo ที่มี id ตรงกัน
            dialogService.successProceed(t); // แสดงข้อความสำเร็จ
            navigate("/"); // นำทางไปหน้าหลัก
        }
    };

    return (
        <>
         {/* ใช้ Helmet เพื่อกำหนด title ของหน้า */}
         <Helmet>
            <title>{ isAdd ? t('TASK.ADD_TASK') : t('TASK.EDIT_TASK') }</title>
        </Helmet>
        <div className="p-6 max-w-xl mx-auto border shadow rounded bg-white">
            <div className="flex justify-between mb-4">
                <div>
                <h1 className="text-2xl font-bold mb-4">{ isAdd ? t('TASK.ADD_TASK') : t('TASK.EDIT_TASK') }</h1>
                </div>
                <div className="flex items-center">
                    {/* ลิงก์กลับไปยังหน้าแรก */}
                    <Link to="/" className="bg-secondary text-black text-sm px-8 py-2 border border-[#c9c9c9] rounded">
                        {t('BUTTON.BACKWARD')}
                    </Link>
                </div>

            </div>
            {/* ฟอร์มสำหรับเพิ่มหรือแก้ไข Todo */}
            <TodoForm onSubmit={handleSubmitTodo} initialData={todoItem!} />
        </div>
        </>
    );
};

export default ManageTodoPage;
