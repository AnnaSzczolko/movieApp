import { API_URL } from '../config/api'

export async function fetchFavourites(token) {
	const response = await fetch(`${API_URL}/favourites`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (response.status === 401) {
		throw new Error('UNAUTHORIZED')
	}

	if (!response.ok) {
		throw new Error('Nie udało się pobrać ulubionych')
	}

	return response.json()
}

export async function addFavourite(movie, token) {
	const response = await fetch(`${API_URL}/favourites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(movie),
	})

	if (response.status === 401) {
		throw new Error('UNAUTHORIZED')
	}

	if (!response.ok) {
		throw new Error('Nie udało się dodać do ulubionych')
	}

	return null
}
export async function removeFavourite(id, token) {

	const response = await fetch(`${API_URL}/favourites/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (response.status === 401) {
		throw new Error('UNAUTHORIZED')
	}

	if (!response.ok) {
		throw new Error('Nie udało się usunąć z ulubionych')
	}

	return null
}
