import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload; // и не нужно возвращать состояния благодаря return
      // return { ...state, title: action.payload }; // старая запись в привычном нам redux
      // state.title = action.payload
      // такой код возможен благодаря использованию slices в reduxjs/toolkit
      // это стало возможно благоларя библиотеке immer
      // Create the next immutable state tree by simply modifying the current tree
      // т.е создавай новое состояние изменяя текущее состояние
      // в привычном redux такое невозможно и мы всегда делали копию на основе оригинала благодаря spread оператору
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { setTitleFilter, resetFilters, setAuthorFilter } =
  filterSlice.actions; // экспортируем action creator

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;
