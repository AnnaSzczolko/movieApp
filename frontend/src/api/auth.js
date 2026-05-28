import { API_URL } from '../config/api'

export async function loginUser(email, password) {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})

	const data = await response.json()

	if (!response.ok) {
		const error = new Error(data?.message || response.statusText || 'Login failed')
		error.status = response.status

		throw error
	}

	return data
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
		const error = new Error(resData?.message || response.statusText || 'Registration failed')
		error.status = response.status

		throw error
	}

	return resData
}
