export async function apiFetch(url, options = {}) {
  const response = await fetch(url, options)

  if (response.status === 401) {
    throw new Error('UNAUTHORIZED')
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}