import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Login, { action as loginAction} from './pages/Login'
import Register, { action as registerAction } from './pages/Register'
import Favourites, { loader as favouritesLoader } from './pages/Favourites'
import Movie, { loader as movieDetailLoader } from './pages/Movie'
import Home, { loader as popularMovieLoader, action as addFavouriteAction } from './pages/Home'
import Error from './pages/Error'
import { useAuthStore } from './store/useAuthStore'
import useHydration from './hooks/useHydration'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <Home />, loader: popularMovieLoader, action: addFavouriteAction },
			{ path: '/login', element: <Login />, action: loginAction},
			{ path: '/register', element: <Register />, action: registerAction },
			{ path: '/favourites', element: <Favourites />, loader: favouritesLoader },
			{ path: '/movie/:id', element: <Movie />, loader: movieDetailLoader },
		],
	},
])
export default function App() {
	const hydrated = useHydration()

	if (!hydrated) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	)
}
