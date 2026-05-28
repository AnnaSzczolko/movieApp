import { Link } from 'react-router-dom'
import { useFetcher } from 'react-router-dom'
import { Form } from 'react-router-dom'
import { handleToggleFavourite } from '../utils/toggle'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function MovieCard({ movie, isFavourite, showFavouriteButton = true }) {
	const location = useLocation()
	const fetcher = useFetcher()

	useEffect(() => {
		if (fetcher.state === 'idle' && fetcher.data?.message) {
			toast(fetcher.data.message)
		}
	}, [fetcher.state, fetcher.data])
	let fetcherError = fetcher.data?.message

	let optimisticFavourite = isFavourite
	const isSubmitting = fetcher.state === 'submitting'
	const movieId = fetcher.formData?.get('movieId')

	if (isSubmitting && Number(movieId) === movie.id) {
		optimisticFavourite = !isFavourite
	}

	const isPending =
		fetcher.state !== 'idle' && fetcher.formData?.get('movieId') && Number(fetcher.formData.get('movieId')) === movie.id

	const toggleHandler = () => {
		handleToggleFavourite({ movie, isFavourite: optimisticFavourite, fetcher })
	}

	const posterSrc = movie.poster
		? movie.poster
		: movie.poster_path
			? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
			: '/placeholder-movie.jpg'

	return (
		<div className="movie-card">
			<Link
				to={location.pathname === '/favourites' ? `/movie/${movie.movieId}` : `/movie/${movie.id}`}
				state={{ from: location.pathname }}
				className="movie-link">
				<img
					src={posterSrc}
					alt={movie.title}
					className="movie-poster"
					onError={e => {
						e.target.src = '/placeholder-movie.jpg'
					}}
				/>
				<div className="movie-info">
					<h3 className="movie-title">{movie.title} </h3>
					<p>{movie.movieId}</p>
					<div className="movie-meta">
						{movie.vote_average != null && <span className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</span>}
						<span className="movie-year">
							{movie.release_date ? new Date(movie.release_date).getFullYear() : movie.year || 'Brak daty'}
						</span>
					</div>
				</div>
			</Link>
			{showFavouriteButton && (
				<div className="movie-button-container">
					<button
						type="button"
						className={`favourite-button ${optimisticFavourite ? 'favourite-active' : ''}`}
						onClick={toggleHandler}
						disabled={isPending}>
						{isSubmitting
							? optimisticFavourite
								? 'Dodawanie...'
								: 'Usuwanie...'
							: optimisticFavourite
								? 'Usuń z ulubionych'
								: 'Dodaj do ulubionych'}
					</button>
				</div>
			)}
		</div>
	)
}
