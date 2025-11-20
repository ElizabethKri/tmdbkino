import {Main} from "@/features/movies/ui/Main/Main.tsx"
import {PageNotFound} from "@/common/components"
import {Route, Routes} from "react-router"
import {CategoryMovies} from "@/features/movies/ui/CategoryMovies/CategoryMovies"
import {FilteredMovies} from "@/features/movies/ui/FilteredMovies/FilteredMovies"
import {Search} from "@/features/movies/ui/Search/Search"
import {Favorites} from "@/features/movies/ui/Favorites/Favorites"

export const Path = {
    Main: "/",
    CategoryMovies: "/category-movies",
    FilteredMovies: "/filtered-movies",
    Search: "/search",
    Favorites: "/favorites",
    Login: "/login",
    NotFound: "*",
} as const

export const Routing = () => {

    return (
        <Routes>
            <Route>
                <Route path={Path.Main} element={<Main/>}/>
                <Route path={Path.CategoryMovies} element={<CategoryMovies/>}/>
                <Route path={Path.FilteredMovies} element={<FilteredMovies/>}/>
                <Route path={Path.Search} element={<Search/>}/>
                <Route path={Path.Favorites} element={<Favorites/>}/>
            </Route>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
