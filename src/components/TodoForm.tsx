import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TodoItem } from '../context/TodoContext';

interface TodoFormProps {
    onSubmit: (todo: TodoItem) => void;
    initialData?: TodoItem; // สำหรับ Edit
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData }) => {
    const formik = useFormik({
        initialValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        if (initialData) {
            formik.setFieldValue('title', initialData?.title);
            formik.setFieldValue('description', initialData?.description);
        }
    }, [initialData, formik.setFormikState]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    className="input"
                />
                {formik.errors.title && formik.touched.title && <div className="text-red-500">{formik.errors.title}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className="input"
                />
                {formik.errors.description && formik.touched.description && <div className="text-red-500">{formik.errors.description}</div>}
            </div>

            <button type="submit" className="btn">
                {initialData ? 'Edit Todo' : 'Add Todo'}
            </button>
        </form>
    );
};

export default TodoForm;
