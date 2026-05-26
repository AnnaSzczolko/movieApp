import { useMemo } from 'react'
import MovieCard from '../components/MovieCard'
import { useLoaderData } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { requireAuth } from '../utils/auth'
import { fetchMovies } from '../api/movie'
import { fetchFavourites, addFavourite, removeFavourite } from '../api/favourites'
import { getHomePageData } from '../services/homePage'

export default function Home() {
	const { movies, favouriteIds } = useLoaderData()

	const favouriteSet = useMemo(() => {
		return new Set(favouriteIds)
	}, [favouriteIds])

	return (
		<section className="home-movies">
			<h1>Popularne filmy</h1>
			<div className="movies-grid">
				{movies.map(movie => (
					<MovieCard key={movie.id} movie={movie} isFavourite={favouriteSet.has(movie.id)} />
				))}
			</div>
		</section>
	)
}


export async function loader() {
	try {
		const token = requireAuth()

		return await getHomePageData(token)
	} catch (error) {
		if (error.message === 'UNAUTHORIZED') {
			throw redirect('/login')
		}

		throw new Error('Nie udało się pobrać filmów.')
	}
}

export async function action({ request }) {
	const token = requireAuth()

	const formData = await request.formData()
	const method = request.method

	const movie = {
		movieId: formData.get('movieId'),
		title: formData.get('title'),
		poster: formData.get('poster'),
		release_date: formData.get('release_date'),
	}

	try {
		if (method === 'POST') {
			await addFavourite(movie, token)
		}
		if (method === 'DELETE') {
			await removeFavourite(movie.movieId, token)
		}

		return { success: true }
	} catch (error) {
		if (error.message === 'UNAUTHORIZED') {
			throw redirect('/login')
		}
		throw error
	}
}
