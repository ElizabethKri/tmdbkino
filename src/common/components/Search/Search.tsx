import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {ChangeEvent} from "react";

export type SearchType = {
    value: string,
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSearch: () => void,
    onKeyPress: (e: React.KeyboardEvent) => void
}


export const Search = ({value, onChangeHandler, handleSearch, onKeyPress}: SearchType) => {

    //const themeMode = useAppSelector(selectThemeMode)


    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
                type="search"
                fullWidth
                placeholder="Search movie title..."
                value={value}
                onChange={onChangeHandler}
                onKeyPress={onKeyPress}
                sx={{ maxWidth: 500, background: 'white'  }}

            />
            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{ textTransform: 'none', px: 4 }}
            >
                Search
            </Button>
        </Box>
    );
};

export default Search;