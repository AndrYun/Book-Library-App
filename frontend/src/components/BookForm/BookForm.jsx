import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import createBookWithId from '../../utils/createBookWithId';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [title, setTilte] = useState('');
  const [author, setAuthor] = useState('');

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
    dispatch(fetchBook());
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
        <button type="button" onClick={addBookRandomByApiHandler}>
          Add Random Book by API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
