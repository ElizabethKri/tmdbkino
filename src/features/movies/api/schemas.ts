import {z} from "zod"

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const MovieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
})

export const PesponceBaseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
})

export const MovieDetailsSchema = MovieSchema.extend({
    runtime: z.number().optional(),
    tagline: z.string().optional(),
    status: z.string().optional(),
    homepage: z.string().optional(),
    budget: z.number().optional(),
    revenue: z.number().optional(),
    genres: z.array(GenreSchema).optional(),
    production_countries: z.array(
        z.object({
            iso_3166_1: z.string(),
            name: z.string(),
        })
    ).optional(),
    spoken_languages: z.array(
        z.object({
            english_name: z.string(),
            iso_639_1: z.string(),
            name: z.string(),
        })
    ).optional(),
})

export const GenresResponseSchema = z.object({
    genres: z.array(GenreSchema),
})

export const SearchMoviesResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
})

// Export inferred types from zod schemas
export type Genre = z.infer<typeof GenreSchema>
export type Movie = z.infer<typeof MovieSchema>
export type PesponceBase = z.infer<typeof PesponceBaseSchema>
export type MovieDetails = z.infer<typeof MovieDetailsSchema>
export type GenresResponse = z.infer<typeof GenresResponseSchema>
export type SearchMoviesResponse = z.infer<typeof SearchMoviesResponseSchema>

