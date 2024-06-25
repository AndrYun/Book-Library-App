import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload); // эта запись возможна благодаря библиотеке immer в reduxjs/toolkit
      // библиотека позволяет создавать новый state мутируя оригинальный state,
      //return [...state, action.payload]; такая запись тоже возможна
      // это старый вариант, который описывали в отельном файле reducers
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...state, isFavorite: !book.isFavorite }
      //     : book
      // );
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
