import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export const CategoryMovies = () => {
    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                Category Movies
            </Typography>
            <Typography variant="body1">
                Выберите категорию фильмов для просмотра
            </Typography>
        </Container>
    )
}
