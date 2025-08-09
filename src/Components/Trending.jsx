import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  // Function to fetch movies by page
  const fetchTrendingMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/trending/movie/day?page=${page}`,
        API_OPTIONS
      );
      if (!res.ok) throw new Error("Failed to fetch trending movies");

      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setTrendingMovies((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  // Intersection observer for infinite scroll
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <section className="mt-20 px-4">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        🔥 Trending Movies
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {trendingMovies.map((movie, index) => {
          const isLast = trendingMovies.length === index + 1;
          return (
            <li
              ref={isLast ? lastMovieRef : null}
              key={movie.id}
              className="relative bg-black/40 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "/no-image.png"
                  }
                  alt={movie.title}
                  className="w-full h-[280px] object-cover"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                  #{index + 1}
                </div>
                <div className="p-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
                    {movie.title}
                  </h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {loading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default Trending;
