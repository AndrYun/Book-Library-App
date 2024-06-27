import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import {
  addBook,
  fetchBook,
  selectIsLoadingByAPI,
} from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import createBookWithId from '../../utils/createBookWithId';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [title, setTilte] = useState('');
  const [author, setAuthor] = useState('');
  const isLoadingByAPI = useSelector(selectIsLoadingByAPI); // использования isLoading из Redux

  const dispatch = useDispatch();

  const addBookRandomHandler = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithId(randomBook, 'random')));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithId({ title, author }, 'manual');

      dispatch(addBook(book)); // отправляет действие (action) в магазин

      setTilte('');
      setAuthor('');
    } else {
      dispatch(setError('Please fill the title and author fields!'));
    }
  };

  // отправка в redux thunk fn
  const addBookRandomByApiHandler = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
  };

  return (
    <div className="app-block book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTilte(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={addBookRandomHandler}>
          Add Random
        </button>
        <button
          type="button"
          onClick={addBookRandomByApiHandler}
          disabled={isLoadingByAPI}
        >
          {isLoadingByAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add Random Book by API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
