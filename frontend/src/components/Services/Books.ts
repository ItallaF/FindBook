import axios from 'axios';

export const searchBooks = async (input: string) => {
  try {
    const response = await axios.get(`http://localhost:3333/books`, {
      params: {
        search: input
      },
    });
    return response.data.data
  } catch (error) {
    null
  }
};