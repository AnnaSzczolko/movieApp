import { useAuthStore } from '../store/useAuthStore'
import {redirect} from "react-router-dom";
import {isTokenExpired} from "./jwt";

export function requireAuth() {
	const token = getValidToken()

	if (!token) {
		throw redirect('/login')
	}

	return token
}

export function getValidToken() {
	const token = useAuthStore.getState().token

	if (!token) {
		return null
	}

	const expired = isTokenExpired(token)

	if (expired) {
		useAuthStore.getState().logout()
		return null
	}

	return token
}
