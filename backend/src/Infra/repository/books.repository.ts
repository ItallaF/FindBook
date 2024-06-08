import mongoose from 'mongoose';
import { BooksRepository } from '../../app/repository/books.repository';
import { BookDto } from '../../app/dto/bookDto';
import { BookEntity } from '../../domain/entity/book.entity';
import { ThemeConsumer } from 'styled-components';

const booksSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  pageCount: Number,
  publishedDate: { $date: String },
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: String,
  authors: [String],
  categories: [String],
  embeddings: [Number],
});

const Books = mongoose.model('books', booksSchema);

class BooksRepositoryMongoose implements BooksRepository {
  create(dto: BookDto) {
    const books = new Books(dto);
    return books.save();
  }
  async find(search: string, embedding: number[], matchedBooks: any): Promise<BookEntity[] | null> {
    const response = await Books.aggregate([
      {
        $vectorSearch: {
          index: 'embeddings',
          limit: 10,
          numCandidates: 20,
          queryVector: embedding,
          path: 'embeddings'
        },
      },
      {
        $match: {
          $or: [
            { title: new RegExp(matchedBooks.title, 'i') },
            { authors: new RegExp(matchedBooks.authors, 'i') },
            { categories: new RegExp(matchedBooks.categories, 'i') },
            { longdescription: new RegExp(matchedBooks.longdescription, 'i') },
          ],
        },},
      {
        $project: {
          _id: 1,
          title: 1,
          thumbnailUrl: 1,
          shortdescription: 1,
          longdescription: 1,
          status: 1,
          authors: 1,
          categories: 1,
          score: { $meta: 'vectorSearchScore' },
        },
      },
    ]);
    return response;
  }
  async update(dto: BookDto, id: string): Promise<BookEntity | null> {
    const response = await Books.findByIdAndUpdate(id, dto);
    return response ? response.toObject() : null;
  }
}

export { BooksRepositoryMongoose };
