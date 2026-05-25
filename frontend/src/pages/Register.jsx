import { useNavigation, useActionData, redirect, Form, Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { registerUser } from '../api/auth'

export default function Register() {
	const navigation = useNavigation()
	const actionData = useActionData()
	const loading = navigation.state === 'submitting'

	return (
		<section className="auth-page">
			<h1>Rejestracja</h1>
			{actionData?.error && <p>{actionData.error}</p>}
			<Form method="post" className="auth-form">
				<label htmlFor="name">
					Imię
					<input disabled={loading} id="name" name="name" type="text" required placeholder="Twoje imię" />
				</label>

				<label htmlFor="email">
					Email
					<input disabled={loading} type="email" name="email" id="email" required placeholder="example@mail.com" />
				</label>

				<label htmlFor="password">
					Hasło
					<input disabled={loading} type="password" name="password" id="password" required placeholder="Twoje hasło" />
				</label>

				<label htmlFor="confirm-password">
					Powtórz hasło
					<input
						disabled={loading}
						type="password"
						id="confirm-password"
						name="confirm-password"
						required
						placeholder="Powtórz hasło"
					/>
				</label>

				<button type="submit" disabled={loading}>
					{loading ? 'Rejestracja...' : 'Zarejestruj się'}
				</button>
			</Form>

			<p className="auth-help">
				Masz już konto? <Link to="/login">Zaloguj się</Link>
			</p>
		</section>
	)
}

export async function action({ request }) {
	try {
		const formData = await request.formData()
		const email = formData.get('email')?.trim()
		const name = formData.get('name')
		const password = formData.get('password')
		const confirmPassword = formData.get('confirm-password')

		if (password !== confirmPassword) {
			return {
				error: 'Hasła nie są takie same',
			}
		}
		const data = await registerUser(name, email, password)

		useAuthStore.getState().login(data.name, data.token)

		return redirect('/')
	} catch (error) {
		return {
			error: error.message || 'Nie można połączyć się z serwerem',
		}
	}
}
