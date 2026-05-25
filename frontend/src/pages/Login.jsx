import { Link, useNavigation, Form, useActionData, redirect, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { getValidToken } from '../utils/auth'
import {loginUser} from '../api/auth'

export default function Login() {
	const navigate = useNavigate()
	const token = getValidToken()

	useEffect(() => {
		if (token) {
			navigate('/')
		}
	}, [token, navigate])

	const navigation = useNavigation()
	const actionData = useActionData()
	const loading = navigation.state === 'submitting'

	return (
		<section className="auth-page">
			<h1>Logowanie</h1>
			{actionData?.error && <p>{actionData.error}</p>}
			<Form method="post" className="auth-form">
				<label htmlFor="email">
					Email
					<input disabled={loading} id="email" type="email" name="email" required placeholder="example@mail.com" />
				</label>

				<label htmlFor="password">
					Hasło
					<input disabled={loading} id="password" type="password" name="password" required placeholder="Twoje hasło" />
				</label>

				<button type="submit" disabled={loading}>
					{loading ? 'Logowanie...' : 'Zaloguj się'}
				</button>
			</Form>

			<p className="auth-help">
				Nie masz konta? <Link to="/register">Zarejestruj się</Link>
			</p>
		</section>
	)
}

export async function action({ request }) {
	try {
		const formData = await request.formData()
		const email = formData.get('email')
		const password = formData.get('password')

		const data = await loginUser(email, password)
		console.log('Login successful:', data)

		useAuthStore.getState().login(data.name, data.token)

		throw redirect('/')
	} catch (error){
		if (error.message === 'INVALID_CREDENTIALS') {
			return {
				error: 'Nieprawidłowy email lub hasło',
			}
		}

		return {
			error: 'Błąd serwera. Spróbuj ponownie później.',
		}
	}
}
