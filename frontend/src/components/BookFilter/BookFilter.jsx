import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  setAuthorFilter,
  selectAuthorFilter,
} from '../../redux/slices/filterSlice';
import './BookFilter.css';

const BookFilter = () => {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  // подписываемся на изменения значения title в ititilState в filterSlice.js
  const titleFilterChangeHandler = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
  };

  const authorFilter = useSelector(selectAuthorFilter);

  const authorFilterChangeHanler = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter bi title"
            onChange={titleFilterChangeHandler}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter bi author"
            onChange={authorFilterChangeHanler}
          />
        </div>
        <button type="button" onClick={resetFiltersHandler}>
          Reset filters{' '}
        </button>
      </div>
    </div>
  );
};

export default BookFilter;

// npm install @reduxjs/toolkit@1.9.5 react-redux@8.1.2
