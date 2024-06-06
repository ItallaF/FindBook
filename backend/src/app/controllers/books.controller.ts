import { HttpRequest, HttpResponse } from "../../Infra/http/httpAdapter";
import { BookDto } from "../dto/bookDto";
import { BooksUseCase } from "../useCases/books.UseCase";

class BooksController {
  constructor(private readonly booksUseCase: BooksUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const body: BookDto = httpRequest.body;

    try {
      const response = await this.booksUseCase.createBook(body);
      return {
        status: 201,
        message: 'Book created',
        data: response,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  async find(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: BookDto = httpRequest.query;

    try {
      const response = await this.booksUseCase.findBook(dto);
      return {
        status: 200,
        message: 'Book found',
        data: response,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
  
  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: BookDto = httpRequest.body;
    const id: string = httpRequest.params.id;

    try {
      const response = await this.booksUseCase.updateBook(dto, id);
      return {
        status: 200,
        message: 'Book found',
        data: response,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}

export { BooksController };