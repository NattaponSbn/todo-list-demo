import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TodoItem } from '../context/TodoContext';
import CharacterCounter from './shared/character-counter';
import DateUtils from '../common/utils/date-utils';
import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'react-flatpickr';
import { CalendarDays } from 'lucide-react';
import { DialogService } from '../core/services/utils/dialog.service';
import { useTranslation } from 'react-i18next';

interface TodoFormProps {
    onSubmit: (todo: TodoItem) => void;
    initialData?: TodoItem; // ใช้สำหรับการแก้ไข (Edit)
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData }) => {
    const [maxLengthDescription, setMaxLengthDescription] = useState(0);
    const flatpickrRef = useRef<any>(null); // เก็บ instance ของ Flatpickr
    const { t } = useTranslation();

    const dialogService = DialogService;

    // ตั้งค่าความยาวสูงสุดของ Description เมื่อคอมโพเนนต์ถูกโหลด
    useEffect(() => {
        setMaxLengthDescription(4000);
    }, []);

    // ฟอร์มเริ่มต้นโดยใช้ Formik
    const formik = useFormik({
        enableReinitialize: true, // เพื่อให้สามารถรีเซ็ตค่าได้
        initialValues: {
            title: initialData?.title || '', // ถ้ามีค่า initialData ใช้ค่า title ถ้าไม่มีให้ใช้ค่าว่าง
            description: initialData?.description || '', // ถ้ามีค่า initialData ใช้ค่า description ถ้าไม่มีให้ใช้ค่าว่าง
            dueDate: initialData?.dueDate ? DateUtils.formatDateTime(initialData?.dueDate) : '', // ถ้ามีค่า dueDate ใช้วันที่ที่ format แล้ว
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'), // validation สำหรับ title
            description: Yup.string().required('Description is required'), // validation สำหรับ description
            dueDate: Yup.string().required('Due is required'), // validation สำหรับ dueDate
        }),
        onSubmit: (values) => {
            handleSubmitClick(values); // เรียกใช้ handleSubmitClick เมื่อฟอร์มถูกส่ง
        },
    });

    const handleChange = (e: any) => {
        formik.handleChange(e); // handleChange สำหรับการเปลี่ยนแปลงค่าของฟอร์ม
    };

    // ฟังก์ชันนี้ใช้เพื่อเซ็ตวันที่ในฟอร์ม
    const setDate = (fieldName: string, date: any) => {
        const dated = DateUtils.formatDateTime2(date[0]); // แปลงวันที่ให้ตรงตามรูปแบบที่ต้องการ
        formik.setFieldValue(fieldName, dated); // ตั้งค่าฟอร์ม field
    };

    // ฟังก์ชันนี้จะถูกเรียกเมื่อกด submit ฟอร์ม
    const handleSubmitClick = (todo: TodoItem) => {
        dialogService.confirmData(t, () => {
            todo.dueDate = DateUtils.convertDateFormat(todo.dueDate); // แปลงวันที่ในฟอร์มให้อยู่ในรูปแบบที่ต้องการ
            onSubmit(todo); // เรียกใช้ฟังก์ชัน onSubmit ที่ได้รับมาจาก props
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            {/* ฟอร์มสำหรับกรอก Title */}
            <div className="mb-4">
                <div className={formik.submitCount ? formik.errors.title && 'has-error' : ''}>
                    <label htmlFor="title" className="form-label form-label--required">{t('TASK.TITLE')}</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={formik.values.title}
                        className="form-input"
                        placeholder={t('TASK.TITLE')!}
                    />
                    {formik.submitCount ? formik.errors.title && <div className="mt-1 text-xs text-end text-danger">{formik.errors.title}</div> : ''}
                </div>
            </div>

            {/* ฟอร์มสำหรับกรอก Description */}
            <div className="mb-4">
                <div className={formik.submitCount ? formik.errors.description && 'has-error' : ''}>
                    <label htmlFor="description" className="form-label form-label--required">{t('TASK.DESCRIPTION')}</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="form-textarea h-28"
                        placeholder={t('TASK.DESCRIPTION')!}
                        maxLength={maxLengthDescription}
                        onChange={(e) => {
                            handleChange(e);
                            setMaxLengthDescription(e.target.maxLength); // อัปเดตค่าความยาวสูงสุดของ description
                        }}
                        value={formik.values.description ?? ''}
                    ></textarea>
                    <div className="flex items-center justify-between mt-[-5px]">
                        <CharacterCounter className={`text-xs`} text={formik.values.description} maxLength={maxLengthDescription} />
                        {formik.submitCount ? formik.errors.description && <div className="mt-1 text-xs text-end text-danger">{formik.errors.description}</div> : ''}
                    </div>
                </div>
            </div>

            {/* ฟอร์มสำหรับเลือก Due Date */}
            <div className="mb-4">
                <div className={formik.submitCount ? formik.errors.dueDate && 'has-error' : ''}>
                    <label htmlFor="dueDate" className="form-label form-label--required">{t('TASK.DUE')}</label>
                    <div className="input-group">
                        <Flatpickr
                            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
                            onChange={(e) => {
                                setDate('dueDate', e); // เมื่อเลือกวันที่ในปฏิทินจะเรียกฟังก์ชันนี้
                            }}
                            value={formik.values.dueDate ?? ''}
                            ref={flatpickrRef!}
                            className="form-input rounded-r-none"
                        />
                        <div
                            className="input-group-label bg-[#e1e8f0] cursor-pointer flex items-center px-2"
                            onClick={() => flatpickrRef.current?.flatpickr?.open()} // เปิดปฏิทินเมื่อคลิกที่ปุ่ม
                        >
                            <CalendarDays className="w-5 h-5 text-gray-700" />
                        </div>
                    </div>
                    {formik.submitCount ? formik.errors.dueDate && <div className="mt-1 text-xs text-end text-danger">{formik.errors.dueDate}</div> : ''}
                </div>
            </div>

            {/* ปุ่ม Submit */}
            <button type="submit" className="btn bg-primary w-full text-white text-sm px-8 py-2 border rounded">
                {initialData ? t('BUTTON.EDIT_TASK') : t('BUTTON.ADD_TASK')} {/* แสดงข้อความปุ่มตามว่าเป็นการแก้ไขหรือเพิ่ม */}
            </button>
        </form>
    );
};

export default TodoForm;
