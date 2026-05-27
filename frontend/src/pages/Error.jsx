import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

export default function Error() {
	const error = useRouteError()
	console.error('Error:', error)


	let title = 'Wystąpił błąd'
	let message = 'Coś poszło nie tak.'

	if (isRouteErrorResponse(error)) {
		try {
			const data = JSON.parse(error.data)
			message = data.message
		} catch {
			message = error.statusText
		}
	} else if (error?.message) {
		message = error.message
	}

	return (
		<>
			<MainNavigation />
			<main>
				<section>
					<h1>{title}</h1>
					<p>{message}</p>
				</section>
			</main>
		</>
	)
}
