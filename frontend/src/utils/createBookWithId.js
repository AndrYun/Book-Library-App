import { v4 as uuid4 } from 'uuid';

const createBookWithId = (book) => {
  return {
    ...book,
    isFavorite: false,
    id: uuid4(),
  };
};

export default createBookWithId;
