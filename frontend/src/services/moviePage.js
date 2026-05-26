import { fetchMovieDetails } from '../api/movie'
import { fetchFavourites } from '../api/favourites'

export async function getMoviePageData(id,token) {
    const [movieData, favData] = await Promise.all([fetchMovieDetails(id), fetchFavourites(token)])

		return {
			movie: movieData || null,
			favouriteIds: favData.map(f => Number(f.movieId)),
		}
}