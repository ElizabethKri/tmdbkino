import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import {Link} from "react-router"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {Movie} from "@/features/movies/api/MainApi.types.ts"
import {Path} from "@/common/routing"
import {boxCardSx, boxSx, buttView, scrollbarSx} from "@/features/movies/ui/Main/MoviesSection/MovieSection.styles.ts";

type MoviesSectionProps = {
    title: string
    subtitle: string
    movies: Movie[]
    viewMorePath?: string
    showViewMore?: boolean
}


export const MoviesSection = ({title, subtitle, movies, viewMorePath = Path.CategoryMovies, showViewMore = true}: MoviesSectionProps) => {
    const displayedMovies = movies.slice(0, 6)

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {subtitle}
            </Typography>
            <Box sx={scrollbarSx}>
                {displayedMovies.map((movie: Movie) => (
                    <Box
                        key={movie.id}
                        sx={boxCardSx}
                    >
                        <MovieCard movie={movie} />
                    </Box>
                ))}
            </Box>
            {showViewMore && (
                <Box sx={boxSx}>
                    <Button
                        component={Link}
                        to={viewMorePath}
                        variant="contained"
                        size="large"
                        sx={buttView}
                    >
                        View More
                    </Button>
                </Box>
            )}
        </Box>
    )
}
