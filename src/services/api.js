const API_KEY = process.env.REACT_APP_API_KEY; 
const BASE_URL = "http://www.omdbapi.com/";

export const fetchMovies = async (searchValue) => {
  const url = `${BASE_URL}?s=${searchValue}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      return responseJson.Search;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};
