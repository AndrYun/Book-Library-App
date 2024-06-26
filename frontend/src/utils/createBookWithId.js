import { v4 as uuid4 } from 'uuid';

const createBookWithId = (book, source) => {
  return {
    ...book,
    source,
    isFavorite: false,
    id: uuid4(),
  };
};

export default createBookWithId;
