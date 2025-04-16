import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ text: string; deadline: string }>) {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        deadline: action.payload.deadline,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      });
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : null;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      return state.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
