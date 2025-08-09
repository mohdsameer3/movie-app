import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Spinner from './Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { ref, inView } = useInView({ triggerOnce: true });
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
                const data = await res.json();
                setMovie(data);
                // Delay to allow fade-in animation
                setTimeout(() => setContentVisible(true), 50);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (!movie) return <Spinner />;

    return (
        <main className={`wrapper py-10 transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Link
                to="/"
                className="inline-block mb-6 text-lg font-semibold text-gradient hover:opacity-80 transition"
            >
                ← Back to Home
            </Link>

            <div className="flex flex-col md:flex-row gap-8 bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex-shrink-0" ref={ref}>
                    {inView && (
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : '/no-image.png'
                            }
                            alt={movie.title}
                            loading="lazy"
                            className="rounded-xl shadow-lg max-w-xs w-full transition-opacity duration-700 opacity-0"
                            onLoad={(e) => e.target.classList.remove("opacity-0")}
                        />
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-gradient">{movie.title}</h1>
                        <p className="text-gray-300 mb-4">{movie.overview}</p>
                    </div>

                    <div className="mt-4 space-y-2 text-gray-400">
                        <p><span className="font-semibold text-white">Release Date:</span> {movie.release_date}</p>
                        <p><span className="font-semibold text-white">Rating:</span> ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</p>
                        <p><span className="font-semibold text-white">Language:</span> {movie.original_language?.toUpperCase()}</p>
                        <p><span className="font-semibold text-white">Runtime:</span> {movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
                        {movie.genres?.length > 0 && (
                            <p>
                                <span className="font-semibold text-white">Genres:</span> {movie.genres.map(g => g.name).join(', ')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MovieDetails;
