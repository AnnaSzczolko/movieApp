import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { useAuthStore } from '../store/useAuthStore'
import {getValidToken} from '../utils/auth'
import { getTokenRemainingTime, isTokenExpired } from '../utils/jwt'

export default function Root() {
	const navigate = useNavigate()
	const token = getValidToken()

	function handleLogout() {
		useAuthStore.getState().logout()
		navigate('/login')
	}

	useEffect(() => {
		if (!token) {
			return
		}
		const remainingTime = getTokenRemainingTime(token)

		if (!remainingTime || remainingTime <= 0) {
			handleLogout()
			return
		}

		const timer = setTimeout(() => {
			handleLogout()
		}, remainingTime)

		return () => clearTimeout(timer)
	}, [token])

	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</>
	)
}
