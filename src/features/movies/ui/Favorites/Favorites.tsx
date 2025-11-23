import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import {useEffect, useState} from "react"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {FavoriteMovie, getFavorites} from "@/common/utils/favorites"
import {Movie} from "@/features/movies/api/MainApi.types.ts"

const convertFavoriteToMovie = (favorite: FavoriteMovie): Movie => {
    const posterPath = favorite.posterUrl.includes("placehold.co") 
        ? null 
        : favorite.posterUrl.replace("https://image.tmdb.org/t/p/w500", "")
    
    return {
        id: favorite.id,
        title: favorite.title,
        poster_path: posterPath,
        vote_average: favorite.voteAverage,
        vote_count: 0,
        overview: "",
        release_date: "",
        adult: false,
        backdrop_path: null,
        genre_ids: [],
        original_language: "",
        original_title: favorite.title,
        popularity: 0,
        video: false,
    }
}

export const Favorites = () => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([])


    useEffect(() => {
        const loadFavorites = () => {
            const favoriteMovies = getFavorites()
            setFavorites(favoriteMovies)
        }
        
        loadFavorites()
        
        // Слушаем изменения через кастомное событие
        const handleFavoritesChange = () => {
            loadFavorites()
        }
        
        window.addEventListener('favoritesChanged', handleFavoritesChange)
        
        // Также слушаем изменения в localStorage (для синхронизации между вкладками)
        const handleStorageChange = () => {
            loadFavorites()
        }
        
        window.addEventListener('storage', handleStorageChange)
        
        return () => {
            window.removeEventListener('favoritesChanged', handleFavoritesChange)
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    const movies = favorites.map(convertFavoriteToMovie)

    return (
        <Container maxWidth={"lg"} sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Favorites
            </Typography>
            
            {favorites.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 8 }}>
                    У вас пока нет избранных фильмов
                </Typography>
            ) : (
                <>
                    <Typography variant="subtitle1" sx={{ mb: 3 }}>
                        Избранных фильмов: {favorites.length}
                    </Typography>
                    <Grid container spacing={3}>
                        {movies.map((movie) => (
                            // @ts-ignore - Grid item is valid in MUI
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    )
}