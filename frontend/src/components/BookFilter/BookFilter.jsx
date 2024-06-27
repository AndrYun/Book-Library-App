import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
import './BookFilter.css';

const BookFilter = () => {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  // подписываемся на изменения значения title в ititilState в filterSlice.js
  const titleFilterChangeHandler = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  // сбрасываем все фильтры
  const resetFiltersHandler = () => {
    dispatch(resetFilters());
  };

  // подписка на изменения по значению author
  const authorFilter = useSelector(selectAuthorFilter);

  const authorFilterChangeHanler = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const onlyFavoriteFilterHandler = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title"
            onChange={titleFilterChangeHandler}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author"
            onChange={authorFilterChangeHanler}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={onlyFavoriteFilterHandler}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={resetFiltersHandler}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default BookFilter;

// npm install @reduxjs/toolkit@1.9.5 react-redux@8.1.2
