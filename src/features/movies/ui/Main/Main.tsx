import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {useFetchMainQuery, useFetchTopRatedQuery, useFetchUpcomingQuery, useFetchNowPlayingQuery} from "@/features/movies/api/MainApi"
import {useMemo} from "react";
import {Movie} from "@/features/movies/api/MainApi.types.ts";
import {BackdropHero} from "@/features/movies/ui/Main/BackdropHero/BackdropHero.tsx";
import {Path} from "@/common/routing";
import {MoviesSection} from "@/features/movies/ui/Main/MoviesSection/MoviesSection";
import {MoviesSectionSkeleton} from "@/common/components";
import Skeleton from "@mui/material/Skeleton";


export const Main = () => {
    const {data: popularData, isLoading: popularLoading, isError: popularError} = useFetchMainQuery()
    const {data: topRatedData, isLoading: topRatedLoading, isError: topRatedError} = useFetchTopRatedQuery()
    const {data: upcomingData, isLoading: upcomingLoading, isError: upcomingError} = useFetchUpcomingQuery()
    const {data: nowPlayingData, isLoading: nowPlayingLoading, isError: nowPlayingError} = useFetchNowPlayingQuery()

    const isLoading = popularLoading || topRatedLoading || upcomingLoading || nowPlayingLoading
    const isError = popularError || topRatedError || upcomingError || nowPlayingError

    const randomMovie = useMemo(() => {
        if (!popularData?.results || popularData.results.length === 0) return null
        const moviesWithBackdrop = popularData.results.filter((movie: Movie) => movie.backdrop_path)
        if (moviesWithBackdrop.length === 0) return null
        const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length)
        return moviesWithBackdrop[randomIndex]
    }, [popularData?.results])

    if (isLoading) {
        return (
            <>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: '400px', md: '600px' },
                        mb: 4,
                        backgroundColor: 'action.hover',
                    }}
                >
                    <Container maxWidth={"lg"} sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%' }}>
                            <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
                            <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                            <Skeleton variant="text" width="70%" height={24} />
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth={"lg"}>
                    <MoviesSectionSkeleton count={6} />
                    <MoviesSectionSkeleton count={6} />
                    <MoviesSectionSkeleton count={6} />
                    <MoviesSectionSkeleton count={6} />
                </Container>
            </>
        )
    }

    if (isError) {
        return (
            <>
                <Container maxWidth={"lg"}>
                    <Typography variant="body1" color="error">
                        Произошла ошибка при загрузке фильмов. Попробуйте обновить страницу.
                    </Typography>
                </Container>
            </>

        )
    }

    if (!popularData || popularData.results.length === 0) {
        return (
            <Container maxWidth={"lg"}>
                <Typography variant="body1">
                    Фильмы не найдены.
                </Typography>
            </Container>
        )
    }

    return (
        <>
            {randomMovie && <BackdropHero movie={randomMovie} />}
        <Container maxWidth={"lg"}>
                <MoviesSection
                    title="Popular Movies"
                    subtitle={`${popularData.total_results} popular movies`}
                    movies={popularData.results}
                    viewMorePath={`${Path.CategoryMovies}?category=popular&page=1`}
                />
                
                {topRatedData && topRatedData.results.length > 0 && (
                    <MoviesSection
                        title="Top Rated"
                        subtitle={`${topRatedData.total_results} top rated movies`}
                        movies={topRatedData.results}
                        viewMorePath={`${Path.CategoryMovies}?category=top_rated&page=1`}
                    />
                )}

                {upcomingData && upcomingData.results.length > 0 && (
                    <MoviesSection
                        title="Upcoming"
                        subtitle={`${upcomingData.total_results} upcoming movies`}
                        movies={upcomingData.results}
                        viewMorePath={`${Path.CategoryMovies}?category=upcoming&page=1`}
                    />
                )}

                {nowPlayingData && nowPlayingData.results.length > 0 && (
                    <MoviesSection
                        title="Now Playing"
                        subtitle={`${nowPlayingData.total_results} now playing movies`}
                        movies={nowPlayingData.results}
                        viewMorePath={`${Path.CategoryMovies}?category=now_playing&page=1`}
                    />
                )}
        </Container>
        </>

    )
}
