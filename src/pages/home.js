import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import MovieList from "../components/movieList";
import "../style/home.css";
import Search from "../components/search";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("surf");

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = await fetchMovies(searchValue);
      setMovies(movieData);
    };

    fetchMovieData();
  }, [searchValue]);

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Explore filmes e séries.</h1>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <MovieList
        movies={movies}
        handleFavouritesClick={() => {}}
        favouriteComponent={() => <></>}
      />
    </div>
  );
}

export default Home;