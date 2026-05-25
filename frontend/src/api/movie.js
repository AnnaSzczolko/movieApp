import { TMDB_BASE_URL, TMDB_API_KEY } from '../config/api'

export async function fetchMovieDetails(id) {
	const response = await fetch(
		`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=pl-PL`
	)

    if (response.status === 401) {
		throw new Error('UNAUTHORIZED')
	}

	if (!response.ok) {
		throw new Error('Nie udało się pobrać filmu')
	}

	return response.json()
}