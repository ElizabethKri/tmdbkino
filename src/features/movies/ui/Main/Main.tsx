import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import {useFetchMainQuery} from "@/features/movies/api/MainApi"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {useMemo} from "react";
import {Movie} from "@/features/movies/api/MainApi.types.ts";
import {BackdropHero} from "@/features/movies/ui/Main/BackdropHero/BackdropHero.tsx";
import Button from "@mui/material/Button";
import {Link} from "react-router";
import {Path} from "@/common/routing";


export const Main = () => {
    const {data, isLoading, isError} = useFetchMainQuery()

    const randomMovie = useMemo(() => {
        if (!data?.results || data.results.length === 0) return null
        const moviesWithBackdrop = data.results.filter((movie: Movie) => movie.backdrop_path)
        if (moviesWithBackdrop.length === 0) return null
        const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length)
        return moviesWithBackdrop[randomIndex]
    }, [data?.results])

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
            <>
                <Container maxWidth={"lg"}>
                    <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                        Popular Movies
                    </Typography>
                    <Typography variant="body1" color="error">
                        Произошла ошибка при загрузке фильмов. Попробуйте обновить страницу.
                    </Typography>
                </Container>
            </>

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

    const displayedMovies = data.results.slice(0, 6)

    return (
        <>
            {randomMovie && <BackdropHero movie={randomMovie} />}
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Popular Movies
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {data.total_results} popular movies
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        mt: 2,
                        pb: 2,
                        '&::-webkit-scrollbar': {
                            height: 8,
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            borderRadius: 4,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderRadius: 4,
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            },
                        },
                    }}
                >
                    {displayedMovies.map((movie: Movie) => (
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                    <Button
                        component={Link}
                        to={Path.CategoryMovies}
                        variant="contained"
                        size="large"
                        sx={{
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                        }}
                    >
                        View More
                    </Button>
                </Box>
            </Container>
        </>

    )
}
