import { useCallback } from 'react';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import { useNavigate } from 'react-router-dom';
import { Book } from '../Contexts/BooksContext';

type Props = {
  id: string;
  book: Book;
};


export function Card({ id, book }: Props) {
  const navigate = useNavigate();
  const handleSelectBook = useCallback(() => {
    navigate(`/${id}`);
  }, [id, navigate]);

  return (
    <div className='p-4 grid grid-cols-3 gap-3 shadow-lg rounded-lg border border-gray-100 max-w-lg w-full'>
      <img
        src={book.thumbnailUrl}
        alt=''
        className='col-span-1 w-full rounded-lg'
      />
      <div className='col-span-2'>
        <p className='font-bold text-2xl text-evergreen'>{book.title}</p>
        <p className='font-light text-lg text-evergrayLight mb-2'>{book.author[0]}</p>
        <Tag title={book.categories[0]} className='mb-3' />
        <p><strong>Sinopse:</strong>{book.shortDescription}
        </p>
        <Button title='Ver mais' variant='light' className='w-1/2' onClick={handleSelectBook} />
      </div>
    </div>
  );
};