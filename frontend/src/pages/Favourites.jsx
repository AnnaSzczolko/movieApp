import MovieCard from '../components/MovieCard'
import { useLoaderData, redirect } from 'react-router-dom'
import {requireAuth } from '../utils/auth'
import {fetchFavourites} from '../api/favourites'


export default function Favourites() {
	const favourites = useLoaderData()

	return (
		<section className="home-movies">
			<h1>Twoje ulubione filmy</h1>
			{!favourites || favourites.length === 0 ? (
				<p>Brak ulubionych filmów. Dodaj filmy do ulubionych na stronie głównej.</p>
			) : (
				<div className="movies-grid">
					{favourites.map(movie => (
						<MovieCard key={movie.id} movie={movie} isFavourite={true} state={{ from: '/favourites' }} />
					))}
				</div>
			)}
		</section>
	)
}


export async function loader() {
	const token = requireAuth()

	try {
		const favourites = await fetchFavourites(token)
		return favourites
	} catch (error) {
		if (error.message === 'UNAUTHORIZED') {
			throw redirect('/login')
		}

		throw new Error('Nie udało się pobrać ulubionych filmów.')
	}
}
