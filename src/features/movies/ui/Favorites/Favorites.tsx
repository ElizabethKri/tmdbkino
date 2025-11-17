import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export const Favorites = () => {
    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                Favorites
            </Typography>
            <Typography variant="body1">
                Ваши избранные фильмы
            </Typography>
        </Container>
    )
}
