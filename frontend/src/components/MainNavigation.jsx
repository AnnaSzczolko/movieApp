import { NavLink, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'



export default function MainNavigation() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const userName = useAuthStore(state => state.user)
	const token = useAuthStore(state => state.token)
	const isLoginPage = pathname === '/login'
	const isRegisterPage = pathname === '/register'

	const handleLogout = () => {
		useAuthStore.getState().logout()
		navigate('/login')
	}

	return (
		<nav className="main-nav">
			<div className="nav-brand">
				MovieApp
				{token && userName && <span className="nav-greeting">Witaj, {userName}</span>}
			</div>
			<div className="nav-links">
				<NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
					Strona główna
				</NavLink>

				{token ? (
					<>
						<NavLink to="/favourites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
							Ulubione
						</NavLink>
						<button type="button" onClick={handleLogout} className="nav-link nav-link-button">
							Wyloguj
						</button>
					</>
				) : (
					<>
						{isLoginPage && (
							<NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
								Rejestracja
							</NavLink>
						)}
						{isRegisterPage && (
							<NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
								Logowanie
							</NavLink>
						)}
						{!isLoginPage && !isRegisterPage && (
							<>
								<NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
									Logowanie
								</NavLink>
								<NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
									Rejestracja
								</NavLink>
							</>
						)}
					</>
				)}
			</div>
		</nav>
	)
}
