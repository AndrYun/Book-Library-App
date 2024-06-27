import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import filterReducer from '../redux/slices/filterSlice';
import errorReducer from '../redux/slices/errorSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});

export default store;
