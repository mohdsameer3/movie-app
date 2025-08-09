import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { title, vote_average, poster_path, original_language, release_date, id } = movie;

  return (
    <li className='movie-card'>
      <Link to={`/movie/${id}`}>
        <img 
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-image.png'} 
          alt={title} 
        />
        <div className='mt-4'>
          <h3>{title}</h3>

          <div className='content'>
            <div className='rating'>
              <img src="star.svg" alt="star" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>.</span>
            <p className='lang'>{original_language}</p>
            <span>.</span>
            <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
