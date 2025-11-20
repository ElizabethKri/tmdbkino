import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={(theme) => ({
                width: "100%",
                padding: theme.spacing(2),
                textAlign: "center",
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.background.paper,
            })}
        >
            <Typography variant="body2" color="text.secondary">
                © 2025 Kinopoisk Demo · Data courtesy of TMDB.
            </Typography>
        </Box>
    )
}

