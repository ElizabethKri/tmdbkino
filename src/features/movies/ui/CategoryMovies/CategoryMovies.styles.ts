import { SxProps } from "@mui/material"

export const boxCategorySx: SxProps = {
    display: 'flex',
    gap: 2,
    overflowX: 'auto',
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