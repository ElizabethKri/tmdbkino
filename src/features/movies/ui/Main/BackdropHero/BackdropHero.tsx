import {BoxSx, ContainerSx, ImgMainSx} from "@/features/movies/ui/Main/BackdropHero/BackDropHero.styles.ts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Movie} from "@/features/movies/api/MainApi.types.ts";
import {SearchMenu} from "@/features/movies/ui/Search/SearchMenu/SearchMenu.tsx";

type BackdropHeroProps = {
 movie: Movie
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

export const BackdropHero = ({movie}: BackdropHeroProps) => {

    const backdropUrl = movie?.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null

    if (!backdropUrl) return null

    const imgUrl = {
        ...ImgMainSx,
        backgroundImage: `url(${backdropUrl})`
    }

    console.log(movie)


    return (
        <Box
            sx={imgUrl}
        >

            <Container maxWidth={"lg"} sx={ContainerSx}>
                <Box sx={BoxSx}>
                    <SearchMenu/>
                    <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {movie.title}
                    </Typography>
                    {movie.overview && (
                        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                            {movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {movie.release_date && (
                            <Typography variant="body2">
                                {new Date(movie.release_date).getFullYear()}
                            </Typography>
                        )}
                        <Typography variant="body2">
                            Rating: {movie.vote_average?.toFixed(1)} / 10
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
};
