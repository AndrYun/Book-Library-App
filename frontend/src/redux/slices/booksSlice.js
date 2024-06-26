import { createSlice } from '@reduxjs/toolkit';
import createBookWithId from '../../utils/createBookWithId';
import axios from 'axios';

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

// запрос на сервер ассинхронный с помощью thunk fn
// обычно в redux мы можем направлять только объект dispatch({})
// но при помощи thunk fn можно теперь направлять и ассинхронные функции
export const thunkFunciton = async (dispatch, getState) => {
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    if (res.data && res.data.title && res.data.author) {
      // сокращенно можно так: (res?.data?.title && res?.data?.author)
      dispatch(addBook(createBookWithId(res.data, 'API')));
    }
  } catch (error) {
    console.log('ВСЕ ПРОПАЛО, ШЕФ!');
  }
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
