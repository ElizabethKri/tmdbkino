import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Pagination from "@mui/material/Pagination"
import Grid from "@mui/material/Grid"
import {useSearchParams} from "react-router"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {MovieCategory} from "@/features/movies/api/MainApi.types.ts"
import {useFetchMoviesByCategoryQuery} from "@/features/movies/api/MainApi"

const CATEGORY_OPTIONS: { value: MovieCategory; label: string; title: string }[] = [
    { value: "popular", label: "Popular", title: "Popular Movies" },
    { value: "top_rated", label: "Top Rated", title: "Top Rated Movies" },
    { value: "upcoming", label: "Upcoming", title: "Upcoming Movies" },
    { value: "now_playing", label: "Now Playing", title: "Now Playing Movies" },
]

const DEFAULT_CATEGORY: MovieCategory = "popular"

export const CategoryMovies = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const rawCategory = searchParams.get("category") as MovieCategory | null
    const category = CATEGORY_OPTIONS.some((option) => option.value === rawCategory) ? (rawCategory as MovieCategory) : DEFAULT_CATEGORY

    const pageParam = Number(searchParams.get("page") ?? "1")
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

    const {data, isLoading, isError} = useFetchMoviesByCategoryQuery({ category, page })

    const currentCategory = CATEGORY_OPTIONS.find((option) => option.value === category) ?? CATEGORY_OPTIONS[0]
    const totalPages = data ? Math.min(data.total_pages, 500) : 0

    const handleCategoryChange = (value: MovieCategory) => {
        if (value === category) return
        setSearchParams({ category: value, page: "1" })
    }

    const handlePageChange = (_event: unknown, value: number) => {
        setSearchParams({ category, page: value.toString() })
    }

    // @ts-ignore
    return (
        <Container maxWidth={"lg"} sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Movies Categories
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                {CATEGORY_OPTIONS.map((option) => (
                    <Button
                        key={option.value}
                        variant={option.value === category ? "contained" : "outlined"}
                        onClick={() => handleCategoryChange(option.value)}
                        sx={{ textTransform: "none" }}
                    >
                        {option.label}
                    </Button>
                ))}
            </Box>

            <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                {currentCategory.title}
            </Typography>

            {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <CircularProgress />
                </Box>
            )}

            {isError && !isLoading && (
                <Typography color="error" sx={{ mt: 3 }}>
                    Не удалось загрузить фильмы. Попробуйте обновить страницу.
                </Typography>
            )}

            {data && data.results.length === 0 && (
                <Typography sx={{ mt: 3 }}>
                    Фильмы не найдены.
                </Typography>
            )}

            {data && data.results.length > 0 && (
                <>
                    <Grid container spacing={3}>
                        {data.results.map((movie) => (
                            // @ts-ignore - Grid item is valid in MUI
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                color="primary"
                                onChange={handlePageChange}
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    )
}