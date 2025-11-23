export type FavoriteMovie = {
    id: number
    title: string
    posterUrl: string
    voteAverage: number
}

const FAVORITES_KEY = "favoriteMovies"

export const getFavorites = (): FavoriteMovie[] => {
    try {
        const favorites = localStorage.getItem(FAVORITES_KEY)
        return favorites ? JSON.parse(favorites) : []
    } catch {
        return []
    }
}

export const addFavorite = (movie: FavoriteMovie): void => {
    try {
        const favorites = getFavorites()
        const exists = favorites.some((fav) => fav.id === movie.id)
        if (!exists) {
            favorites.push(movie)
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
        }
    } catch (error) {
        console.error("Error adding favorite:", error)
    }
}

export const removeFavorite = (movieId: number): void => {
    try {
        const favorites = getFavorites()
        const filtered = favorites.filter((fav) => fav.id !== movieId)
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
    } catch (error) {
        console.error("Error removing favorite:", error)
    }
}

export const isFavorite = (movieId: number): boolean => {
    const favorites = getFavorites()
    return favorites.some((fav) => fav.id === movieId)
}

export const toggleFavorite = (movie: FavoriteMovie): boolean => {
    const isFav = isFavorite(movie.id)
    if (isFav) {
        removeFavorite(movie.id)
        window.dispatchEvent(new CustomEvent('favoritesChanged'))
        return false
    } else {
        addFavorite(movie)
        window.dispatchEvent(new CustomEvent('favoritesChanged'))
        return true
    }
}

