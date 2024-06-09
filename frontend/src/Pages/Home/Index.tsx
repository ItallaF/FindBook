import { useCallback, useContext, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Input } from '../../components/Input/Input';
import { Card } from '../../components/Card/Card';
import { searchBooks } from '../../components/Services/Books';
import { BoocksContext } from '../../components/Contexts/BooksContext';

const genderBooks = [
  'Ação',
  'Aventura',
  'Biografia',
  'Comedia',
  'Dreama',
  'Ficção',
];

export function Home() {
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const { books, handleSetBooks } = useContext(BoocksContext);

  const handleSelect = useCallback(
    (title: string) => {
      if (selectedGender.includes(title)) {
        const removeGender = selectedGender.filter((item) => item !== title);
        setSelectedGender(removeGender);
      } else {
        setSelectedGender([...selectedGender, title]);
      }
    },
    [selectedGender],
  );
  const handleSubmit = useCallback(
    async (value: string) => {
      const response = await searchBooks(value);
      handleSetBooks(response);
    }, [handleSetBooks]);
  return (
    <body className='mb-6'>
      <Header />
      <Container>
        <Title title='O que você qer ler hoje?' />
        <div className='gap-8 grid md:grid-cols-8 my-6 grid-cols-3'>
          {genderBooks.map((book, index) => (
            <Button
              key={index}
              title={book}
              variant={selectedGender.includes(book) ? 'dark' : 'light'}
              onClick={() => handleSelect(book)}
            />
          ))}
        </div>
        <div className='py-7'>
          <p className='text-evergreen font-semibold text-2xl'>
            Sobre o que você gostaria de receber uma recomendação de livro?
          </p>
          <Input
            placeholder='Eu gostaria de ler...'
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                handleSubmit(e.target.value);
              }
            }
            } />
        </div>
        <Title title='Livros recomendados' className='my-5' />
        <div className='grid md:grid-cols-3 gap-4'>
          {books.map(book => {
            return (
              <Card id={book._id} book={book} />
            )
          })};
        </div>
      </Container>
    </body>
  );
};