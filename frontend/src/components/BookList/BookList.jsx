import { useSelector, useDispatch } from 'react-redux';
import { BsBookmarkStar, BsBookmarkPlusFill } from 'react-icons/bs';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books); // подписываемся на часть состояние - массив книг
  const dispatch = useDispatch();

  const toggleBookHandler = (id) => {
    dispatch(toggleFavorite(id));
  };

  const deleteBookHandler = (id) => {
    dispatch(deleteBook(id));
  };
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => toggleBookHandler(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkPlusFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button
                  onClick={() => deleteBookHandler(book.id)}
                  id="deleteBook"
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
