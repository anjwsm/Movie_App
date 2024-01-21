import { useEffect, useState } from "react";

import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";
import Loader from "./components/Loader";

const API_URL = " http://www.omdbapi.com/?i=tt3896198&apikey=6a298fc0";

// const movie1 = {
//   "Title": "Amazing Spiderman Syndrome",
//   "Year": "2012",
//   "imdbID": "tt2586634",
//   "Type": "movie",
//   "Poster": "N/A"
// }

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (title) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    searchMovies("Superheroes");
  }, []);

  console.log(error,'nbssjfksjdkj')
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <div className="keysearch">
        <div className="keys" onClick={() => searchMovies("Marvel")}>
          <p>Marvel</p>
        </div>
        <div className="keys" onClick={() => searchMovies("Barbie")}>
          <p>Barbie</p>
        </div>
        <div className="keys" onClick={() => searchMovies("Avatar")}>
          <p>Avatar</p>
        </div>
        <div className="keys" onClick={() => searchMovies("Bollywood")}>
          <p>Bollywood</p>
        </div>
        <div className="keys" onClick={() => searchMovies("Hollywood")}>
          <p>Hollywood</p>
        </div>
      </div>
      {/* {[1,2,3,5].map(e=><p>{e}</p>)} */}

      {error ? (
        error
      ) : loading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
