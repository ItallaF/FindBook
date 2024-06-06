import express, { Application } from 'express';
import cors from 'cors';
import { BookRoutes } from '../router/books.routes';
import { connect } from '../database/mongoose';
import dotenv from 'dotenv';

dotenv.config();
class Express {
  app: Application;
  constructor() {
  this.app = express();
  this.initMiddleware();
  BookRoutes(this.app);
  }
  
  private initMiddleware(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  listen() {
    this.app.listen(3333, () => {
      connect();
      console.log('Server is Runing on port 3333')
    });
  }
}

export default Express;