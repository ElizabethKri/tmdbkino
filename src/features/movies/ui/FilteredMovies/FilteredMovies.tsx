import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Slider from "@mui/material/Slider"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import {useSearchParams} from "react-router"
import {MovieCard} from "@/common/components"
import {useDiscoverMoviesQuery, useFetchMovieGenresQuery} from "@/features/movies/api/MainApi"
import {Genre} from "@/features/movies/api/MainApi.types.ts"

const SORT_OPTIONS = [
    { value: "popularity.desc", label: "По популярности (убывание)" },
    { value: "popularity.asc", label: "По популярности (возрастание)" },
    { value: "vote_average.desc", label: "По рейтингу (убывание)" },
    { value: "vote_average.asc", label: "По рейтингу (возрастание)" },
    { value: "primary_release_date.desc", label: "По дате выпуска (убывание)" },
    { value: "primary_release_date.asc", label: "По дате выпуска (возрастание)" },
    { value: "original_title.asc", label: "По названию (А-Я)" },
    { value: "original_title.desc", label: "По названию (Я-А)" },
]

const DEFAULT_SORT = SORT_OPTIONS[0].value
const DEFAULT_RATING_RANGE: [number, number] = [0, 10]

export const FilteredMovies = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get("sort_by") ?? DEFAULT_SORT
    const pageParam = Number(searchParams.get("page") ?? "1")
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

    const ratingMinParam = Number(searchParams.get("vote_average_gte") ?? DEFAULT_RATING_RANGE[0])
    const ratingMaxParam = Number(searchParams.get("vote_average_lte") ?? DEFAULT_RATING_RANGE[1])
    const ratingParamRange: [number, number] = [
        Number.isNaN(ratingMinParam) ? DEFAULT_RATING_RANGE[0] : ratingMinParam,
        Number.isNaN(ratingMaxParam) ? DEFAULT_RATING_RANGE[1] : ratingMaxParam,
    ]

    const selectedGenres = useMemo(() => {
        const rawGenres = searchParams.get("with_genres")
        if (!rawGenres) return []
        return rawGenres.split(",").filter(Boolean)
    }, [searchParams])

    const [sliderValue, setSliderValue] = useState<[number, number]>(ratingParamRange)
    const [debouncedSliderValue, setDebouncedSliderValue] = useState<[number, number]>(ratingParamRange)

    useEffect(() => {
        setSliderValue(ratingParamRange)
        setDebouncedSliderValue(ratingParamRange)
    }, [ratingParamRange[0], ratingParamRange[1]])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSliderValue(sliderValue)
        }, 200)
        return () => clearTimeout(handler)
    }, [sliderValue])

    const updateParams = useCallback((updates: Record<string, string | null>) => {
        const newParams = new URLSearchParams(searchParams)
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                newParams.delete(key)
            } else {
                newParams.set(key, value)
            }
        })
        setSearchParams(newParams)
    }, [searchParams, setSearchParams])

    useEffect(() => {
        const [min, max] = debouncedSliderValue
        const currentMin = Number(ratingParamRange[0].toFixed(1))
        const currentMax = Number(ratingParamRange[1].toFixed(1))
        const nextMin = Number(min.toFixed(1))
        const nextMax = Number(max.toFixed(1))

        if (currentMin === nextMin && currentMax === nextMax) return

        updateParams({
            "vote_average_gte": nextMin.toFixed(1),
            "vote_average_lte": nextMax.toFixed(1),
            page: "1",
        })
    }, [debouncedSliderValue, ratingParamRange, updateParams])

    const { data: genresData, isLoading: genresLoading } = useFetchMovieGenresQuery()

    const { data, isLoading, isError } = useDiscoverMoviesQuery({
        sort_by: sortBy,
        page,
        vote_average_gte: ratingParamRange[0],
        vote_average_lte: ratingParamRange[1],
        with_genres: selectedGenres.length ? selectedGenres.join(",") : undefined,
    })

    const totalPages = data ? Math.min(data.total_pages, 500) : 0

    const handleSortChange = (event: SelectChangeEvent) => {
        updateParams({
            sort_by: event.target.value,
            page: "1",
        })
    }

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setSliderValue([newValue[0], newValue[1]])
        }
    }

    const toggleGenre = (id: number) => {
        const idString = String(id)
        const exists = selectedGenres.includes(idString)
        const nextGenres = exists ? selectedGenres.filter((genreId) => genreId !== idString) : [...selectedGenres, idString]

        updateParams({
            with_genres: nextGenres.length ? nextGenres.join(",") : null,
            page: "1",
        })
    }

    const handleReset = () => {
        updateParams({
            sort_by: DEFAULT_SORT,
            vote_average_gte: DEFAULT_RATING_RANGE[0].toFixed(1),
            vote_average_lte: DEFAULT_RATING_RANGE[1].toFixed(1),
            with_genres: null,
            page: "1",
        })
        setSliderValue(DEFAULT_RATING_RANGE)
        setDebouncedSliderValue(DEFAULT_RATING_RANGE)
    }

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        updateParams({
            page: value.toString(),
        })
    }

    return (
        <Container maxWidth={"lg"} sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Filtered Movies
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Box sx={{ position: "sticky", top: 100, border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 3 }}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Сортировка</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="sort-select-label">Сортировка</InputLabel>
                                <Select
                                    labelId="sort-select-label"
                                    value={sortBy}
                                    label="Сортировка"
                                    onChange={handleSortChange}
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Фильтр по рейтингу
                                </Typography>
                                <Slider
                                    value={sliderValue}
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    valueLabelDisplay="auto"
                                    onChange={handleSliderChange}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                    <Typography variant="body2">от {sliderValue[0].toFixed(1)}</Typography>
                                    <Typography variant="body2">до {sliderValue[1].toFixed(1)}</Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Жанры
                                </Typography>
                                {genresLoading && (
                                    <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                                        <CircularProgress size={24} />
                                    </Box>
                                )}
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {genresData?.genres.map((genre: Genre) => {
                                        const isActive = selectedGenres.includes(String(genre.id))
                                        return (
                                            <Button
                                                key={genre.id}
                                                variant={isActive ? "contained" : "outlined"}
                                                size="small"
                                                onClick={() => toggleGenre(genre.id)}
                                                sx={{ textTransform: "none" }}
                                            >
                                                {genre.name}
                                            </Button>
                                        )
                                    })}
                                </Box>
                            </Box>

                            <Button variant="outlined" color="inherit" onClick={handleReset}>
                                Сбросить фильтры
                            </Button>
                        </Stack>
                    </Box>
                </Grid>


                <Grid item xs={12} md={9}>
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {isError && !isLoading && (
                        <Typography color="error" sx={{ mt: 3 }}>
                            Не удалось загрузить фильмы. Попробуйте еще раз.
                        </Typography>
                    )}

                    {!isLoading && data && data.results.length === 0 && (
                        <Typography sx={{ mt: 3 }}>
                            Фильмы не найдены. Попробуйте изменить параметры поиска.
                        </Typography>
                    )}

                    {data && data.results.length > 0 && (
                        <>
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                Найдено фильмов: {data.total_results}
                            </Typography>
                            <Grid container spacing={3}>
                                {data.results.map((movie) => (
                                    // @ts-ignore - Grid item is valid in MUI
                                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
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
                </Grid>
            </Grid>
        </Container>
    )
}