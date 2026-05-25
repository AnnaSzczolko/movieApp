import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function Error() {
	const error = useRouteError()

	let title = 'Wystąpił błąd'
	let message = 'Coś poszło nie tak.'

	if (isRouteErrorResponse(error)) {
		message = error.data?.message || error.statusText
	} else if (error?.message) {
		message = error.message
	}

	return (
		<section>
			<h1>{title}</h1>
			<p>{message}</p>
		</section>
	)
}
