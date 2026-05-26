import { TMDB_BASE_URL, TMDB_API_KEY } from '../config/api'
import { apiFetch } from './client'

export async function fetchMovieDetails(id) {
	return apiFetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=pl-PL`)
}


export async function fetchMovies() {

	return apiFetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=pl-PL&page=1`)

}

