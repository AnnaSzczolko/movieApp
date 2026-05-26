import { API_URL } from '../config/api'
import { apiFetch } from './client'

export async function fetchFavourites(token) {
	return apiFetch(`${API_URL}/favourites`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}


export async function addFavourite(movie, token) {
	return apiFetch(`${API_URL}/favourites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(movie),
	})
}

export async function removeFavourite(id, token) {
	return apiFetch(`${API_URL}/favourites/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

}
