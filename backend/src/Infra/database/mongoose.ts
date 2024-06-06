import mongoose from 'mongoose';
import { HTTPExceptions } from '../../types/HTTPExceptions';

export async function connect() {
  try {
    if (!process.env.DATABASE_URL)
      throw new HTTPExceptions(500, 'Missing DATABASE_URL');
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connected');
  } catch (error: any) {
    throw new HTTPExceptions(500, error.message);
  }
}
