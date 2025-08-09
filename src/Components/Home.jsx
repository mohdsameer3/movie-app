import React, { useEffect, useState, useRef, useCallback } from 'react';
import Search from './Search';
import Spinner from './Spinner';
import MovieCard from './MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from '../appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovie, setTrendingMovie] = useState([]);

  // Infinite scroll state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovie = async (query = '', pageNumber = 1) => {
    setLoading(true);
    setErrormsg('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNumber}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNumber}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("failed to fetch movie");
      }

      const data = await response.json();
      if (data.results.length === 0) {
        if (pageNumber > 1) setHasMore(false);
        return;
      }

      setMovies(prev =>
        pageNumber === 1 ? data.results : [...prev, ...data.results]
      );

      if (query && data.results.length > 0 && pageNumber === 1) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.log(error);
      setErrormsg('Error occurred during fetching movies');
    } finally {
      setLoading(false);
    }
  };

  const LoadTrendingMovie = async () => {
    try {
      const movie = await getTrendingMovies();
      setTrendingMovie(movie);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch when search changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchMovie(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm]);

  // Infinite scroll observer
  const lastMovieRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Fetch when page changes (except initial handled above)
  useEffect(() => {
    if (page > 1) {
      fetchMovie(debouncedSearchTerm, page);
    }
  }, [page]);

  useEffect(() => {
    LoadTrendingMovie();
  }, []);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>

        <header>
          <img src="./hero.png" alt="Hero scrren" />
          <h1>
            Find <span className='text-gradient'>Movies</span> Enjoy without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovie.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovie.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {errormsg && <p className='text-red-600'>{errormsg}</p>}

          <ul>
            {movies.map((movie, indx) => {
              const isLast = movies.length === indx + 1;
              return (
                <div
                  ref={isLast ? lastMovieRef : null}
                  key={movie.id}
                >
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </ul>

          {loading && <Spinner />}
        </section>
      </div>
    </main>
  );
};

export default Home;
