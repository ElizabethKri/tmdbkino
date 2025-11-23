import { Path } from "@/common/routing"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Link } from "react-router"
import HomeIcon from "@mui/icons-material/Home"
import s from './PageNotFound.module.css'

export const PageNotFound = () => (
  <Container maxWidth="lg" className={s.container}>
    <Box sx={{ textAlign: "center", maxWidth: 600 }}>
      <Typography
        variant="h1"
        component="h1"
        className={s.typography404}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        Страница не найдена
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: 4,
          fontSize: "1.1rem",
        }}
      >
        К сожалению, запрашиваемая страница не существует. Возможно, она была удалена или перемещена.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={Path.Main}
        size="large"
        startIcon={<HomeIcon />}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          textTransform: "none",
        }}
      >
        Вернуться на главную
      </Button>
    </Box>
  </Container>
)
