import { ReactNode, createContext, useState } from 'react';

export type Book = {
  author: string[];
  categories: string[];
  longDescription: string;
  score: number;
  shortDescription: string;
  status: string;
  thumbnailUrl: string;
  title: string;
  _id: string;
};

type propsContext = {
  books: Book[];
  handleSetBooks: (books: Book[]) => void;
};
export const BoocksContext = createContext({} as propsContext);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  function handleSetBooks(books: Book[]) {
    setBooks(books);
  }
  return <BoocksContext.Provider value={{
    books,
    handleSetBooks,
  }}>
    {children}
  </BoocksContext.Provider>
};