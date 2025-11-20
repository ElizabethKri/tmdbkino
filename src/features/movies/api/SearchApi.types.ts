import {Movie} from "@/features/movies/api/MainApi.types.ts";

export type SearchMovieParams = {
    query: string;
    page?: number;
}

export type SearchMoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}