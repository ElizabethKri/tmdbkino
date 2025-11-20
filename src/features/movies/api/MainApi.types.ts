export type MovieCategory = "popular" | "top_rated" | "upcoming" | "now_playing"

export type PesponceBase = {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export type Movie = {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type MovieDetails = Movie & {
    runtime?: number
    tagline?: string
    status?: string
    homepage?: string
    budget?: number
    revenue?: number
    genres?: { id: number; name: string }[]
    production_countries?: { iso_3166_1: string; name: string }[]
    spoken_languages?: { english_name: string; iso_639_1: string; name: string }[]
}