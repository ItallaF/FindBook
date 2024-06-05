import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Home/Index';
import { BookDetails } from '../Pages/BookDatails/Index';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
};