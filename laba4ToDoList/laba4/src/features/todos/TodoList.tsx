import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { toggleComplete } from './todosSlice';
import { format, isBefore, differenceInHours } from 'date-fns';
import { Todo } from '../../types';

const groupByDate = (todos: Todo[]) => {
  const groups: Record<string, Todo[]> = {};
  todos.forEach(todo => {
    const date = todo.createdAt.split('T')[0]; 
    if (!groups[date]) groups[date] = [];
    groups[date].push(todo);
  });
  return groups;
};

const getDeadlineClass = (deadline: string) => {
  const now = new Date();
  const date = new Date(deadline);

  if (isBefore(date, now)) return 'text-danger'; 
  if (differenceInHours(date, now) <= 24) return 'text-warning'; 
  return 'text-success'; // норм
};

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const grouped = groupByDate(todos);

  return (
    <div className="todo-list">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-5">
          <h5 className="border-bottom pb-1 mb-3">
            📅 {format(new Date(date), 'dd MMM yyyy')}
          </h5>
          {items.map(todo => (
            <div
              key={todo.id}
              className={`d-flex justify-content-between align-items-center p-3 mb-2 rounded shadow-sm ${
                todo.completed ? 'bg-light' : 'bg-white'
              }`}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleComplete(todo.id))}
                />
                <div>
                  <div
                    className={`fw-semibold ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
                  >
                    {todo.text}
                  </div>
                  {!todo.completed && (
                    <small className={`d-block ${getDeadlineClass(todo.deadline)}`}>
                      до {format(new Date(todo.deadline), 'dd.MM.yyyy HH:mm')}
                    </small>
                  )}
                  {todo.completed && todo.completedAt && (
                    <small className="text-muted d-block">
                      ✅ Завершено: {format(new Date(todo.completedAt), 'dd.MM.yyyy HH:mm')}
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
