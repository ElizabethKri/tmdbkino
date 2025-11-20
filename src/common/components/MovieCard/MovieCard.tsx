import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {Movie} from "@/features/movies/api/MainApi.types.ts";


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

type MovieCardProps = {
    movie: Movie
}

export const MovieCard = ({movie}: MovieCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {movie.poster_path && (
                <CardMedia
                    component="img"
                    height="400"
                    image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {movie.title}
                </Typography>
                {movie.release_date && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {new Date(movie.release_date).getFullYear()}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {movie.vote_average.toFixed(1)} / 10
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        Votes: {movie.vote_count}
                    </Typography>
                </Box>
                {movie.overview && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
}


