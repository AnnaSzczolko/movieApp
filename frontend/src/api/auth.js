import { API_URL } from '../config/api'

export async function loginUser(email, password) {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})

	const resData = await response.json()

	if (response.status === 401 || response.status === 422) {
		throw new Error('INVALID_CREDENTIALS')
	}

	if (!response.ok) {
		throw new Error(resData.message || 'LOGIN_FAILED')
	}

	return resData
}
export async function registerUser(name, email, password) {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password }),
	})

	const resData = await response.json()

	if (!response.ok) {
		throw new Error(resData.message || 'Błąd rejestracji')
	}

	return resData
}
