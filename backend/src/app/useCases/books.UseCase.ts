import { generateEmbeddings } from '../../Infra/services/openai/generateEmbeddings';
import { searchOpenAi } from '../../Infra/services/openai/search';
import { BookDto } from '../dto/bookDto';
import { BooksRepository } from '../repository/books.repository';

export type GptResponse = {
  title: 'string',
  author: 'string',
  categories: 'string',
  longdescription: 'string',
}

class BooksUseCase {
  private booksRepository: BooksRepository;
  constructor(booksRepository: BooksRepository) {
    this.booksRepository = booksRepository;
  }
  async createBook(dto: BookDto) {
    const dataEmbedding = {
      title: dto.title,
      categories: dto.categories,
      authors: dto.authors,
      shortDescription: dto.shortDescription,
      longDescription: dto.longDescription
    };
    const generateEmbedding = await generateEmbeddings(
      JSON.stringify(dataEmbedding)
    );
    return this.booksRepository.create({
      ...dto,
      embeddings: generateEmbedding,
    });
  }
  async searchBooks(search: string) {
    const generateEmbedding = await generateEmbeddings(search);
    const searchResponce: GptResponse = await searchOpenAi(search);
    const matchedBooks = this.matchedBooks(searchResponce);

    return this.booksRepository.find(search, generateEmbedding, matchedBooks);
  }
  async updateBook(dto: BookDto, id: string) {
    const dataEmbedding = {
      title: dto.title,
      categories: dto.categories,
      authors: dto.authors,
      shortDescription: dto.shortDescription,
      longDescription: dto.longDescription
    };
    const generateEmbedding = await generateEmbeddings(
      JSON.stringify(dataEmbedding)
    );

    return this.booksRepository.update({
      ...dto,
      embeddings: generateEmbedding,
    },
      id,
    );
  }
  private matchedBooks(search: GptResponse): Record<string, any> {
    const matchedBooks = { $match: {} };

    if (search.title) {
      matchedBooks.$match = {
        title: search.title,
      };
    }
    if (search.author) {
      matchedBooks.$match = {
        author: search.author,
      };
    }
    if (search.categories) {
      matchedBooks.$match = {
        categories: search.categories,
      };
    }
    if (search.longdescription) {
      matchedBooks.$match = {
        longdescription: search.longdescription,
      };
    }
    return matchedBooks;
  }
}
export { BooksUseCase };
