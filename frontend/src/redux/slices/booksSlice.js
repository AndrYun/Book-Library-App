import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createBookWithId from '../../utils/createBookWithId';
import axios from 'axios';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingByAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fethcBook',
  async (url, thunkAPI) => {
    // thunkAPI это объект, в котором содержится все инфа о запросе (config, requestId, getState, dispathc и т.д)
    // в том числе есть доступ к функции dispatch
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // OPTION 1
      return thunkAPI.rejectWithValue(error); // отклоняем промис
      // OPNTION 2
      // throw error; // выбрасываем ошибку, снова генерируем ее, чтобы не попасть в reducer.fullfiled выполненное состояние
      // нам необходимо в блоке reducer попасть в состояние rejected, тем самым мы генерируем ошибку
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload); // эта запись возможна благодаря библиотеке immer в reduxjs/toolkit
      // библиотека позволяет создавать новый state мутируя оригинальный state,
      //return [...state, action.payload]; такая запись тоже возможна
      // это старый вариант, который описывали в отельном файле reducers
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
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

  // Option 1 - иная запись extraReducers без использования спец слова builder
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBookWithId(action.payload, 'API'));
  //     }
  //   }
  // }
  // Option 2
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingByAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingByAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingByAPI = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingByAPI = (state) => state.books.isLoadingByAPI;

export default booksSlice.reducer;
