import {changeThemeModeAC, selectThemeMode} from "@/app/app-slice.ts"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {containerSx} from "@/common/styles"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import {Link, useLocation} from "react-router";
import {Path} from "@/common/routing";
import s from "@/app/App.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {boxSx} from "@/common/styles/container.styles.ts";

export const Header = () => {
    const themeMode = useAppSelector (selectThemeMode)
    const location = useLocation()


    const dispatch = useAppDispatch ()

    const changeMode = () => {
        dispatch (changeThemeModeAC ({themeMode: themeMode === "light" ? "dark" : "light"}))
    }


    const menuItems = [
        { path: Path.Main, label: "Main" },
        { path: Path.CategoryMovies, label: "Category Movies" },
        { path: Path.FilteredMovies, label: "Filtered Movies" },
        { path: Path.Search, label: "Search" },
        { path: Path.Favorites, label: "Favorites" },
    ]

    return (
        <AppBar position="static" sx={{mb: "30px"}}>
            <Toolbar>
                <Container maxWidth={"lg"} sx={containerSx}>
                    <Link to={Path.Main} className={s.logo}>
                        <img
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                            alt="TMDB"
                            style={{ height: '20px', cursor: 'pointer' }}
                        />
                    </Link>
                    <Box sx={boxSx}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <div className={s.container}>
                        <Switch color={"default"} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
