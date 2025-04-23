import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TodoItem } from '../context/TodoContext';
import CharacterCounter from './shared/character-counter';
import DateUtils from '../common/utils/date-utils';
import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'react-flatpickr';
import { CalendarDays } from 'lucide-react';

interface TodoFormProps {
    onSubmit: (todo: TodoItem) => void;
    initialData?: TodoItem; // สำหรับ Edit
}



const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData }) => {
    const [maxLengthDescription, setMaxLengthDescription] = useState(0);
    const flatpickrRef = useRef<any>(null); // เก็บ instance ของ Flatpickr

    useEffect(() => {
        setMaxLengthDescription(4000);
    }, []);

    const formik = useFormik({
        initialValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            dueDate: initialData?.dueDate ? DateUtils.formatDateStr(initialData?.dueDate) : '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            dueDate: Yup.string().required('Due is required'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    const handleChange = (e: any) => {
        formik.handleChange(e);
    };

    useEffect(() => {
        if (initialData) {
            formik.setFieldValue('title', initialData?.title);
            formik.setFieldValue('description', initialData?.description);
            formik.setFieldValue('dueDate', DateUtils.formatDateStr(initialData?.dueDate) ?? '');
        }
    }, [initialData, formik.setFormikState]);

    const setDate = (fieldName: string, date: any) => {
        const dated = DateUtils.formatDateSend(date[0]);
        formik.setFieldValue(fieldName, dated);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <div className={formik.submitCount ? formik.errors.title && 'has-error' : ''}>
                    <label htmlFor="title" className="form-label form-label--required">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={formik.values.title}
                        className="form-input"
                        placeholder={'title'}
                    />
                    {formik.submitCount ? formik.errors.title && <div className="mt-1 text-xs text-end text-danger">{formik.errors.title}</div> : ''}
                </div>
            </div>

            <div className="mb-4">
                <div className={formik.submitCount ? formik.errors.description && 'has-error' : ''}>
                    <label htmlFor="description" className="form-label form-label--required">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="form-textarea h-28"
                        placeholder={'description'}
                        maxLength={maxLengthDescription}
                        onChange={(e) => {
                            handleChange(e);
                            setMaxLengthDescription(e.target.maxLength);
                        }}
                        value={formik.values.description ?? ''}
                    ></textarea>
                    <div className="flex items-center justify-between mt-[-5px]">
                        <CharacterCounter className={`text-xs`} text={formik.values.description} maxLength={maxLengthDescription} />
                        {formik.submitCount ? formik.errors.description && <div className="mt-1 text-xs text-end text-danger">{formik.errors.description}</div> : ''}
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className={formik.submitCount ? formik.errors.dueDate && 'has-error' : ''}>
                    <label htmlFor="dueDate" className="form-label form-label--required">Due</label>
                    <div className="input-group">
                        <Flatpickr
                            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
                            onChange={(e) => {
                                setDate('dueDate', e);
                            }}
                            value={formik.values.dueDate ?? ''}
                            ref={flatpickrRef}
                            render={({ defaultValue, ...props }, ref) => (
                                <input
                                    {...props}
                                    ref={ref}
                                    name="dueDate"
                                    id="dueDate"
                                    className="form-input rounded-r-none"
                                />
                            )}
                        />
                        <div
                            className="input-group-label bg-[#e1e8f0] cursor-pointer flex items-center px-2"
                            onClick={() => flatpickrRef.current?.flatpickr?.open()} // <<< เปิดปฏิทิน
                        >
                            <CalendarDays className="w-5 h-5 text-gray-700" />
                        </div>
                    </div>

                    {formik.submitCount ? formik.errors.title && <div className="mt-1 text-xs text-end text-danger">{formik.errors.title}</div> : ''}
                </div>
            </div>

            <button type="submit" className="btn bg-primary w-full text-white text-sm px-8 py-2 border rounded">
                {initialData ? 'Edit Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TodoForm;
