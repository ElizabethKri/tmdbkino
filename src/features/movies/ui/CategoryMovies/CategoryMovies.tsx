import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import {useFetchMainQuery} from "@/features/movies/api/MainApi"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {Movie} from "@/features/movies/api/MainApi.types.ts"
import {boxCategorySx} from "@/features/movies/ui/CategoryMovies/CategoryMovies.styles.ts";

export const CategoryMovies = () => {
    const {data, isLoading, isError} = useFetchMainQuery()

    console.log(data)

    if (isLoading) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Popular Movies
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        )
    }

    if (isError) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Popular Movies
                </Typography>
                <Typography variant="body1" color="error">
                    Произошла ошибка при загрузке фильмов. Попробуйте обновить страницу.
                </Typography>
            </Container>
        )
    }

    if (!data || data.results.length === 0) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Popular Movies
                </Typography>
                <Typography variant="body1">
                    Фильмы не найдены.
                </Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                Popular Movies
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {data.total_results} popular movies
            </Typography>
            <Box
                sx={boxCategorySx}
            >
                {data.results.map((movie: Movie) => (
                    <Box
                        key={movie.id}
                        sx={{
                            minWidth: { xs: '280px', sm: '300px', md: '320px' },
                            maxWidth: { xs: '280px', sm: '300px', md: '320px' },
                            flexShrink: 0,
                        }}
                    >
                        <MovieCard movie={movie} />
                    </Box>
                ))}
            </Box>
        </Container>
    )
}



