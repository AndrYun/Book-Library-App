import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/books/actionCreators';
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
    dispatch(addBook(createBookWithId(randomBook)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithId({ title, author });

      dispatch(addBook(book)); // отправляет действие (action) в магазин

      setTilte('');
      setAuthor('');
    }
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
      </form>
    </div>
  );
};

export default BookForm;
