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
    maxWidth: '500px',
}

export  const buttonSearchSx: SxProps = {
    textTransform: 'none',
    backgroundColor: 'rgb(2,8,46)',
    '&:hover': {
        backgroundColor: 'rgb(7,27,71)',
    },
    '&:disabled' : {
    backgroundColor: 'rgb(7,27,71, 0.74)',
    color: "white",
}
}