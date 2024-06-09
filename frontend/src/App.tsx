import { BooksProvider } from './components/Contexts/BooksContext';
import { AppRoutes } from './routes';


function App() {
  return (
    <BooksProvider>
      <AppRoutes />
    </BooksProvider>
  )
}

export default App
