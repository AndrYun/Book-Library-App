import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createBookWithId from '../../utils/createBookWithId';
import axios from 'axios';

const initialState = [];

export const fetchBook = createAsyncThunk('bookks/fethcBook', async () => {
  const res = await axios.get('http://localhost:4000/random-book');
  return res.data;
});

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
  // extraReducer для запросов thunk fn на сервер
  // тем самым мы запихнули thunk fn внутрь slice
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, 'API'));
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
