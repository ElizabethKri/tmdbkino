import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import {Link, useParams} from "react-router"
import {useFetchMovieDetailsQuery} from "@/features/movies/api/MainApi"
import {Path} from "@/common/routing"
import {BoxMovieSx, BoxTextSx, ImgSx} from "@/features/movies/ui/MovieDetails/MovieDetails.style.ts";


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
const POSTER_PLACEHOLDER = "https://placehold.co/500x750?text=No+Image"

export  type GenProps = {
    name: string
    id: string
}

export const MovieDetails = () => {
    const {movieId} = useParams()
    const numericId = Number(movieId)
    const shouldSkip = !movieId || Number.isNaN(numericId)
    const {data, isLoading, isError} = useFetchMovieDetailsQuery(numericId, { skip: shouldSkip })

    if (isLoading) {
        return (
            <Container maxWidth={"lg"}>
                <Box sx={BoxMovieSx}>
                    <CircularProgress />
                </Box>
            </Container>
        )
    }

    if (isError || !data) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="body1" color="error" sx={{ mt: 6 }}>
                    Не удалось загрузить информацию о фильме. Попробуйте позже.
                </Typography>
            </Container>
        )
    }

    console.log(data.genres)

    const backdropUrl = data.backdrop_path ? `${IMAGE_BASE_URL}${data.backdrop_path}` : undefined
    const posterUrl = data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : POSTER_PLACEHOLDER


    const backText = {
        ...BoxTextSx,
        backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined
    }


    return (
        <Box sx={{ pb: 6 }}>
            <Box
                sx={backText}
            >
                <Container maxWidth={"lg"} sx={{ position: "relative", height: "100%" }}>
                    <Box sx={{ position: "absolute", bottom: 24 }}>
                        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
                            {data.title}
                        </Typography>
                        {data.tagline && (
                            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.8)" }}>
                                {data.tagline}
                            </Typography>
                        )}
                    </Box>
                </Container>
            </Box>

            <Container maxWidth={"lg"}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                    <Box
                        component="img"
                        src={posterUrl}
                        alt={data.title}
                        sx={ImgSx}
                    />

                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                            <Chip
                                label={`Рейтинг: ${data.vote_average.toFixed(1)}`}
                                color={data.vote_average >= 7 ? "success" : data.vote_average >= 5 ? "warning" : "error"}
                            />
                            {data.runtime && <Chip label={`Длительность: ${data.runtime} мин`} variant="outlined" />}
                            <Chip label={`Голоса: ${data.vote_count}`} variant="outlined" />
                        </Box>

                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Описание
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                            {data.overview || "Описание недоступно."}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                            {data.release_date && (
                                <Typography variant="body2" color="text.secondary">
                                    Дата выхода: {new Date(data.release_date).toLocaleDateString()}
                                </Typography>
                            )}
                            {data.status && (
                                <Typography variant="body2" color="text.secondary">
                                    Статус: {data.status}
                                </Typography>
                            )}
                        </Box>

                        {data.genres && data.genres.length > 0 && (

                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                                {data.genres.map((gen: GenProps) => (
                                    <Chip key={gen.id} label={gen.name} variant="outlined" />
                                ))}
                            </Box>
                        )}

                        <Button component={Link} to={Path.Main} variant="contained">
                            Вернуться на главную
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

