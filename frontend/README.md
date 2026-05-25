# MovieApp Frontend

Aplikacja do przeglądania filmów zbudowana z React i Vite.

## Konfiguracja

1. Skopiuj plik `.env.example` do `.env`:

   ```bash
   cp .env.example .env
   ```

2. Zdobądź klucz API z [The Movie Database](https://www.themoviedb.org/settings/api):
   - Zarejestruj się na TMDB
   - Przejdź do ustawień API
   - Wygeneruj klucz API v3
   - Dodaj klucz do pliku `.env`:
     ```
     VITE_TMDB_API_KEY=twój_klucz_api_tutaj
     ```

## Uruchomienie

```bash
npm install
npm run dev
```

## Funkcje

- Logowanie i rejestracja użytkowników
- Przeglądanie popularnych filmów
- Lista ulubionych filmów
- Responsywny design

## Technologie

- React 19
- React Router
- Vite
- TMDB API
