import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import {useSearchParams} from "react-router"
import {useSearchMoviesQuery} from "@/features/movies/api/SearchApi"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import {MovieCard} from "@/common/components/MovieCard/MovieCard"
import {MovieCardSkeleton} from "@/common/components"
import Pagination from "@mui/material/Pagination"
import {ChangeEvent, useEffect, useState} from "react"
import Search from "@/common/components/Search/Search"
import Skeleton from "@mui/material/Skeleton"

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("query") || ""
    const pageParam = Number(searchParams.get("page") ?? "1")
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
    
    const [searchInput, setSearchInput] = useState(query)
    const [disabledBtn, setDisabledBtn] = useState('')


    useEffect(() => {
        setSearchInput(query)
    }, [query])

    const {data, isLoading, isError} = useSearchMoviesQuery(
        {query, page},
        {skip: !query}
    )

    const handleSearch = () => {
        const trimmedQuery = searchInput.trim()
        if (trimmedQuery) {
            setSearchParams({query: trimmedQuery, page: "1"})
        }


    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }

    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchInput(value)

        if (disabledBtn.trim()) {
            setDisabledBtn('')
        }
        
        // Если поле очищено через крестик (значение стало пустым)
        if (value === "") {
            setSearchParams({})
        }
    }

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        if (query) {
            setSearchParams({query, page: value.toString()})
        }
    }

    const totalPages = data ? Math.min(data.total_pages, 500) : 0


    return (
        <Container maxWidth={"lg"} sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Search
            </Typography>


            
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Search handleSearch={handleSearch} value={searchInput}
                        onChangeHandler={handleInputChange} onKeyPress={handleKeyPress}
                        disabled={!disabledBtn.trim()}
                />
            </Box>

            {!query && (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 8 }}>
                    Enter a movie title to start searching
                </Typography>
            )}

            {query && isLoading && (
                <>
                    <Skeleton variant="text" width={300} height={32} sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        {Array.from({ length: 12 }).map((_, index) => (
                            // @ts-ignore - Grid item is valid in MUI
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <MovieCardSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {query && isError && !isLoading && (
                <Typography variant="body1" color="error" sx={{ mt: 3 }}>
                    Произошла ошибка при поиске фильмов. Попробуйте еще раз.
                </Typography>
            )}

            {query && !isLoading && data && data.results.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 8 }}>
                    No matches found for "{query}"
                </Typography>
            )}

            {query && !isLoading && data && data.results.length > 0 && (
                <>
                    <Typography variant="subtitle1" sx={{ mb: 3 }}>
                        Found {data.total_results} results for "{query}"
                    </Typography>
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

