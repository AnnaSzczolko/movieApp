export async function apiFetch(url, options = {}) {
	const response = await fetch(url, options)

	if (response.status === 204) {
		return null
	}

	let data = null

	try {
		data = await response.json()
	} catch {
		data = null
	}

	if (!response.ok) {
		const error = new Error(data?.message || response.statusText || 'Request failed')
		error.status = response.status

		throw error
	}

	return data
}
