import OpenAI from 'openai';
import { HTTPExceptions } from '../../../types/HTTPExceptions';

export async function generateEmbeddings(input: string){
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  try {
    const response = await openAi.embeddings.create({
      input,
      model: 'text-embedding-ada-002',
    });
    console.log('OpenAi called')
    return response.data[0].embedding;
  } catch (error: any) {
    throw new HTTPExceptions(500, error.message);
  }
};