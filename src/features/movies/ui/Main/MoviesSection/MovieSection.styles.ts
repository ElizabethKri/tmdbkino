import { SxProps } from "@mui/material"

export const scrollbarSx: SxProps = {
    display: 'flex',
    gap: 2,
    overflowX: 'auto',
    mt: 2,
    pb: 2,
    '&::-webkit-scrollbar': {
        height: 8,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 4,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    },
}

export const boxCardSx: SxProps = {
    minWidth: { xs: '280px', sm: '300px', md: '320px' },
    maxWidth: { xs: '280px', sm: '300px', md: '320px' },
    flexShrink: 0,
}

export const boxSx = {
    display: 'flex',
    justifyContent: 'center',
    mt: 4,
    mb: 4
}

export const buttView = {
    textTransform: 'none',
    px: 4,
    py: 1.5,
    fontSize: '1.1rem',
}