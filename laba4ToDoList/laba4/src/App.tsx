import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './features/todos/todosSlice';
import TodoList from './features/todos/TodoList';

export default function App() {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() && deadline) {
      dispatch(addTodo({ text, deadline }));
      setText('');
      setDeadline('');
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mb-4">
        <h2 className="mb-3 text-center">📝 Мой список дел</h2>
        <div className="row g-2 align-items-center">
          <div className="col-md-5">
            <input
              type="text"
              placeholder="Введите задачу"
              value={text}
              onChange={e => setText(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="datetime-local"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3 text-end">
            <button onClick={handleAdd} className="btn btn-success w-100">Добавить</button>
          </div>
        </div>
      </div>

      <TodoList />
    </div>
  );
}
