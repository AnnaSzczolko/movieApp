import { Link, useLocation, useLoaderData, useFetcher, redirect } from 'react-router-dom'
import { handleToggleFavourite } from '../utils/toggle'
import { requireAuth } from '../utils/auth'
import { fetchMovieDetails } from '../api/movie'
import { fetchFavourites } from '../api/favourites'
import { getMoviePageData } from '../services/moviePage'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function Movie() {
	const { movie, favouriteIds } = useLoaderData()
	const location = useLocation()

	const backlink = location.state?.from || '/'

	const isFavourite = favouriteIds.includes(movie.id)

	const fetcher = useFetcher()
	let optimisticFavourite = isFavourite
	const isSubmitting = fetcher.state !== 'idle'
	const isAdding = fetcher.formData?.get('movieId') == movie.id && fetcher.formData && fetcher.formMethod === 'post'

	const isDeleting = fetcher.formData?.get('movieId') == movie.id && fetcher.formData && fetcher.formMethod === 'delete'

	if (isAdding) optimisticFavourite = true
	if (isDeleting) optimisticFavourite = false

	const toggleHandler = () => {
		handleToggleFavourite({ movie, isFavourite: optimisticFavourite, fetcher })
	}

	if (!movie) {
		return (
			<section className="movie-empty">
				<h1>Brak danych</h1>
				<Link to="/" className="button-link">
					Wróć do listy filmów
				</Link>
			</section>
		)
	}

	const posterSrc = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder-movie.jpg'

	return (
		<section className="movie-details">
			<div className="movie-details-card">
				<img
					src={posterSrc}
					alt={movie.title}
					className="movie-details-poster"
					onError={e => {
						e.target.src = '/placeholder-movie.jpg'
					}}
				/>

				<div className="movie-details-info">
					<div className="movie-details-header">
						<h1>{movie.title}</h1>

						<button
							type="button"
							className={`favourite-button ${optimisticFavourite ? 'favourite-active' : ''}`}
							onClick={toggleHandler}
							disabled={fetcher.state !== 'idle' && fetcher.formData?.get('movieId') == movie.id}>
							{optimisticFavourite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
						</button>
					</div>

					<p className="movie-details-subtitle">
						{movie.release_date ? new Date(movie.release_date).toLocaleDateString('pl-PL') : 'Brak daty premiery'}
						{movie.vote_average != null && ` · ⭐ ${movie.vote_average.toFixed(1)}`}
					</p>
					<p className="movie-details-overview">{movie.overview || 'Brak opisu filmu.'}</p>

					{movie.genres?.length > 0 && (
						<div className="movie-details-genres">
							<strong>Gatunki:</strong> {movie.genres.map(genre => genre.name).join(', ')}
						</div>
					)}

					<div className="movie-details-extra">
						<p>
							<strong>Czas trwania:</strong> {movie.runtime ? `${movie.runtime} min` : 'Brak danych'}
						</p>
						<p>
							<strong>Kraj produkcji:</strong>{' '}
							{movie.production_countries?.length > 0
								? movie.production_countries.map(country => country.name).join(', ')
								: 'Brak danych'}
						</p>
					</div>

					<Link to={backlink} className="button-link">
						Wróć do listy filmów
					</Link>
				</div>
			</div>
		</section>
	)
}


export async function loader({ params }) {
	try {
		if (!params.id) {
			throw new Error('Movie ID is required')
		}

		const token = requireAuth()

		const id = params.id


		return await getMoviePageData(id, token)
	} catch (error) {
		if (error.message === 'UNAUTHORIZED') {
			throw redirect('/login')
		}

		throw new Error('Nie udało się pobrać szczegółów filmu.')
	}
}
