import axios, { AxiosResponse } from 'axios';

interface FetchApiResponse<T> {
  data: T | null;
  error?: string;
}

async function FetchApi<T>(url: string): Promise<FetchApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      data: null,
      error: 'Terjadi kesalahan saat mengambil data',
    };
  }
}

export default FetchApi;
