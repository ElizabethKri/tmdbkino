import { SxProps } from "@mui/material"

export  const BoxMovieSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    mt: 6
}

export const BoxTextSx: SxProps = {
    position: "relative",
    height: { xs: 300, md: 450 },
    backgroundSize: "cover",
    backgroundPosition: "center",
    mb: 4,
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
    },
}

export const ImgSx: SxProps = {
    width: { xs: "100%", md: 320 },
    borderRadius: 2,
    boxShadow: 3,
    objectFit: "cover",
}