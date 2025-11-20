import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CardActions from "@mui/material/CardActions"
import CardActionArea from "@mui/material/CardActionArea"
import {Link} from "react-router"
import {useState} from "react"
import {Movie} from "@/features/movies/api/MainApi.types.ts"
import {Path} from "@/common/routing"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const POSTER_PLACEHOLDER = "https://placehold.co/500x750?text=No+Image"

type MovieCardProps = {
    movie: Movie
}

const getRatingColor = (rating: number) => {
    if (rating >= 7) return "success"
    if (rating >= 5) return "warning"
    return "error"
}

export const MovieCard = ({movie}: MovieCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const posterSrc = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : POSTER_PLACEHOLDER

    const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setIsFavorite((prev) => !prev)
    }

    const detailsPath = Path.MovieDetails.replace(":movieId", String(movie.id))

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardActionArea component={Link} to={detailsPath} sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                <CardMedia
                    component="img"
                    height="380"
                    image={posterSrc}
                    alt={movie.title}
                    sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1, width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="h6" component="h2" sx={{ mr: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {movie.title}
                        </Typography>
                        <Chip
                            label={movie.vote_average.toFixed(1)}
                            color={getRatingColor(movie.vote_average)}
                            size="small"
                        />
                    </Box>
                    {movie.release_date && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {new Date(movie.release_date).getFullYear()}
                        </Typography>
                    )}
                    {movie.overview && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {movie.overview.length > 120 ? `${movie.overview.substring(0, 120)}...` : movie.overview}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Голоса: {movie.vote_count}
                </Typography>
                <IconButton onClick={toggleFavorite} color={isFavorite ? "error" : "default"}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    )
}
