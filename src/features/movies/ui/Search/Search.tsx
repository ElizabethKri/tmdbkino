import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export const Search = () => {
    return (
        <Container maxWidth={"lg"}>
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
                Search
            </Typography>
            <Typography variant="body1">
                Поиск фильма по названию
            </Typography>
        </Container>
    )
}
