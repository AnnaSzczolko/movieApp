import { fetchMovies } from '../api/movie'
import { fetchFavourites } from '../api/favourites'
export async function getHomePageData(token){

    const [moviesRes, favRes] = await Promise.all([fetchMovies(), fetchFavourites(token)])

    const favouriteIds = favRes.map(f => Number(f.movieId))

	return {
			movies: moviesRes.results || [],
			favouriteIds
	}

}