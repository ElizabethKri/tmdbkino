import { SxProps } from "@mui/material"

export  const textFieledSx: SxProps = {
    backgroundColor: 'rgba(4,8,30,0.42)',
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(23,23,44,0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(80,187,204)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(4,75,87)',
        },
    },
    '& .MuiInputBase-input::placeholder': {
        color: 'rgb(255,255,255)',
        opacity: 1,
    },
    width: '200px',
}

export  const buttonSearchSx: SxProps = {
    textTransform: 'none',
    backgroundColor: 'rgb(68,75,90)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
}