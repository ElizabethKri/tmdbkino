import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import {useSearchParams} from "react-router"
import {useSearchMoviesQuery} from "@/features/movies/api/SearchApi"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {SearchMenu} from "@/features/movies/ui/Search/SearchMenu/SearchMenu.tsx";
import {BoxSx} from "@/features/movies/ui/Main/BackdropHero/BackDropHero.styles.ts";

export const Search = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query") || ""

    const {data, isLoading, isError} = useSearchMoviesQuery(
        {query},
        {skip: !query}
    )

    if (!query) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Search
                </Typography>
                <Typography variant="body1">
                    Введите название фильма в поле поиска выше и нажмите кнопку Search
                </Typography>
                <Box sx={BoxSx}>
                    <SearchMenu/>
                </Box>
            </Container>
        )
    }

    if (isLoading) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Search Results for: {query}
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
                    Search Results for: {query}
                </Typography>
                <Typography variant="body1" color="error">
                    Произошла ошибка при поиске фильмов. Попробуйте еще раз.
                </Typography>
            </Container>
        )
    }

    if (!data || data.results.length === 0) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                    Search Results for: {query}
                </Typography>
                <Typography variant="body1">
                    Фильмы не найдены. Попробуйте изменить поисковый запрос.
                </Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                Search Results for: {query}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Found {data.total_results} results
            </Typography>
            <Grid container spacing={4}>
                {data.results.map((movie) => (
                    // @ts-ignore - Grid item is valid in MUI
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

