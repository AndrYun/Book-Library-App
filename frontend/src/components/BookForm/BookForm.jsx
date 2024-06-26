import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addBook } from '../../redux/slices/booksSlice';
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
    }
  };

  //запрос на сервер асинхронный
  const addBookRandomByApiHandler = async () => {
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
