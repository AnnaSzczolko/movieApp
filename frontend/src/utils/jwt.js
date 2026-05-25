export function getTokenPayload(token) {
	if (!token) {
		return null
	}

	try {
		const payload = JSON.parse(atob(token.split('.')[1]))
		return payload
	} catch {
		return null
	}
}

export function isTokenExpired(token) {
	if (!token) {
		return true
	}

	const payload = getTokenPayload(token)

	if (!payload?.exp) {
		return true
	}

	return payload.exp * 1000 < Date.now()
}
export function getTokenRemainingTime(token) {
	if (!token) {
		return null
	}

	const payload = getTokenPayload(token)

	if (!payload?.exp) {
		return null
	}

	return payload.exp * 1000 - Date.now()
}