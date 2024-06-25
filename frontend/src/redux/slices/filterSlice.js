import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavotite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload; // и не нужно возвращать состояния благодаря return
      // return { ...state, title: action.payload }; // старая запись в привычном нам redux
      // state.title = action.payload
      // такой код возможен благодаря использованию slices в reduxjs/toolkit
      // это стало возможно благоларя библиотеке immer
      // Create the next immutable state tree by simply modifying the current tree
      // т.е создавай новое состояние изменяя текущее состояние
      // в привычном redux такое невозможно и мы всегда делали копию на основе оригинала благодаря spread оператору
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setOnlyFavoriteFilter: (state) => {
      state.onlyFavotite = !state.onlyFavotite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  resetFilters,
  setAuthorFilter,
  setOnlyFavoriteFilter,
} = filterSlice.actions; // экспортируем action creator

//подписка на изменения в состоянии state
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavotite;

// стоит отметить, что подписка на каждое событие, ели таких собитий много достаточно не удобно
// можно вынести общий объект со всеми подписками:
// export const selectFilters = (state) => state.filters
// и далее просто доставать из объекта нужную нам подписку их состояния
// НО при таком подходе перерендер компонента может быть частый так как мы экспортируем общий state

// экспортируем редьюсер нашего пирога, в котором могут быть несколько редьюсеров
export default filterSlice.reducer;
