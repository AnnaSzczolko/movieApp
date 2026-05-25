

export const handleToggleFavourite = ({movie, isFavourite, fetcher}) => {

		const formData = new FormData()

		formData.append('movieId', movie.movieId || movie.id)
		formData.append('title', movie.title)
		formData.append('poster', movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '')
		formData.append('release_date', movie.release_date)

		fetcher.submit(formData, { method: isFavourite ? 'DELETE' : 'POST', action: '/' })
	}