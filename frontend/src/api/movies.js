import { TMDB_BASE_URL, TMDB_API_KEY } from '../config/api'

export async function fetchMovies() {
	const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=pl-PL&page=1`)

    if (response.status === 401) {
		throw new Error('UNAUTHORIZED')
	}

	if (!response.ok) {
		throw new Error('Nie udało się pobrać filmów')
	}

	return response.json()
}