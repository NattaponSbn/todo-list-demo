// src/pages/TodoListPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { TodoItem, useTodos } from "../context/TodoContext";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useCallback, useMemo } from "react";
import DateUtils from "../common/utils/date-utils";
import { Pencil, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
import { DialogService } from "../core/services/utils/dialog.service";

const TodoListPage = () => {
  const { todos, updateTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dialogService = DialogService;

  const handleChangeChecked = useCallback((todo: TodoItem, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...todo, isChecked: e.target.checked }; // Create a new copy of the todo object with the updated value
    updateTodo(todo.id!, updatedItem); // Pass the updated todo object
  }, [updateTodo]);
  
  const handleEditClick = useCallback((todo: TodoItem) => {
    navigate(`/manage/${todo.id}/edit`); // Assuming `todo.id` is always available
  }, [navigate]);
  
  const handleDeleteClick = useCallback((todo: TodoItem) => {
    dialogService.confirmDeleteData(t, () => {
      deleteTodo(todo.id!); // Ensure `todo.id` is available and passed to `deleteTodo`
      dialogService.successProceed(t);
    });
  }, [deleteTodo, dialogService, t]);
  
  const tasksLeft = useMemo(() => {
    return todos.filter(x => !x.isChecked).length;
  }, [todos]);
  

  return (
    <>
     <Helmet>
      <title>{t('TASK.TODO_LIST')}</title>
    </Helmet>
    <div className="p-6 max-w-xl mx-auto border shadow rounded bg-white">
      <h1 className="text-2xl font-bold mb-4">{t('TASK.TODO_LIST')}</h1>
      <div className="flex justify-between mb-4">
        <div>
          <h5 className="font-bold mb-1">{t('TASK.MY_TASKS')}</h5>
          <p className="text-xs text-muted">{t('TASK.YOU_HAVE')} {tasksLeft} {t('TASK.TASKS_LEFT')}!</p>
        </div>
        <div className="flex items-center">
          <Link to="/manage/add" className="bg-primary text-white text-sm px-8 py-2 border rounded">
          {t('BUTTON.ADD_TASK')}
          </Link>
        </div>

      </div>

      <ul className="mt-4 space-y-2 ">

        {todos.length > 0 &&
          <div className="overflow-x-auto h-72">
            {todos.map((todo: TodoItem, index: number) => (
              <li
                key={todo.id}
                className="grid grid-cols-4 gap-2 items-start border-2 p-2 rounded mb-2 h-[7.5rem]"
              >
                <div className="col-span-3">
                  <div className="grid grid-cols-6 gap-1">
                    <div className="text-center">
                      <input
                        type="checkbox"
                        checked={todo.isChecked}
                        onChange={(e) => handleChangeChecked(todo, index, e)}
                        className="form-checkbox mr-0 border-primary outline-primary"
                      />
                    </div>
                    <div className="col-span-5">
                      <div>

                        <Tippy content={todo.title}>
                          <div className="flex flex-row relative max-w-md">
                            <span className={`font-bold truncate ${todo.isChecked && 'line-through'}`}>{todo.title}</span>
                          </div>
                        </Tippy>
                      </div>
                      <div>
                        <Tippy content={todo.description}>
                          <div className="relative max-w-md">
                            <p className="line-clamp-2 text-muted text-sm">{todo.description}</p>
                          </div>
                        </Tippy>
                      </div>
                      <p className="text-danger text-sm mt-3">{t('TASK.DUE')} : {DateUtils.formatDateStr(todo.dueDate ?? '')}</p>
                    </div>
                  </div>


                </div>
                <div className="space-x-2 text-center mt-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="text-yellow-600 me-1"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(todo)}
                    className="text-red-600"
                  >
                    <Trash />
                  </button>
                </div>
              </li>
            ))}
          </div>}

        {todos.length === 0 && <p>{t('SHARED.NO_DATAS')}</p>}
      </ul>
    </div>
    </>
   
  );
};

export default TodoListPage;
