import axios from "axios";

export const getRandomMovie = async () => {
  try {
    const response = await axios.get(`${process.env.URL}/movie/random`);

    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const useMovie = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.URL}/movie/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
