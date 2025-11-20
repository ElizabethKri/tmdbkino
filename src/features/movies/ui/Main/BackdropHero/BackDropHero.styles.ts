import { SxProps } from "@mui/material"


export  const ContainerSx: SxProps = {
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center' }

export  const  BoxSx: SxProps = {
    color: 'white',
    zIndex: 1,
    maxWidth: '600px'
}

export const ImgMainSx: SxProps = {
    position: 'relative',
    width: '100%',
    height: { xs: '400px', md: '600px' },
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    mb: 4,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
    },
}