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

export const getMovies = async () => {
  try {
    const response = await axios.get(`${process.env.URL}/movie/movies`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFavorite = async (userId: string) => {
  try {
    const response = await axios.get(
      `${process.env.URL}/movie/favorite/${userId}`
    );
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addFavorite = async (movieId: any, userId: any) => {
  try {
    const response = await axios.post(`${process.env.URL}/movie/favorite`, {
      movieId,
      userId,
    });
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFavorite = async (movieId: any, userId: any) => {
  try {
    const response = await axios.post(
      `${process.env.URL}/movie/removefavorite`,
      {
        movieId,
        userId,
      }
    );
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
