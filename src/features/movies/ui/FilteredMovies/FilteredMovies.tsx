import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export const FilteredMovies = () => {
    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                Filtered Movies
            </Typography>
            <Typography variant="body1">
                Фильтруйте и сортируйте фильмы по различным условиям
            </Typography>
        </Container>
    )
}



