import OpenAI from 'openai';
import { HTTPExceptions } from '../../../types/HTTPExceptions';
import { GptResponse } from '../../../app/useCases/books.UseCase';

export async function searchOpenAi(input: string): Promise<GptResponse> {
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  try {
    const response = await openAi.chat.completions.create({
      messages: [
        {
        role: 'system',
        content: `
        - Não é para buscar nada fora dos dados fornecidos
        - Não é para inventar nenhuma informação, quero apenas que retorne o que foi solicitado
        - Preciso da resposta no formato JSON
        - Lista de categorias: ['Ficção', 'Não-ficção', 'Romance', 'Terror', 'Aventura', 'Fantasia', 'História', 'Autoajuda', 'Técnico', 'Infantil, 'Didático']
        - Identificar se a mensagem do usuário corresponde a alguma categoria da lista de categorias em português ou inglês. Caso não seja retorne a categoria do livro encontrado.
        - Realizar uma busca por title, authors, categories e longdescription.
        - Retornar sempre o primeiro autor da lista de authors.
        - Instrução de formato de saída para JSON: {title: string, author: string, categories: string, longdescription: string}`,
      },
      {
        role: 'user',
        content: input,
      }
    ],
    response_format: {
      type: 'json_object',
    },
      model: 'gpt-3.5-turbo-1106'
    });
    console.log("🚀 ~ searchOpenAi ~ response:", response)
    console.log('searchOpeAi called');
    const output = JSON.parse(response.choices[0].message.content!);
    return output;
  } catch (error: any) {
    throw new HTTPExceptions(500, error.message);
  }
};