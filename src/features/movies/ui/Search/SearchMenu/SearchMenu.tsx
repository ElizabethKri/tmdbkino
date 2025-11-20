import {Box, TextField} from "@mui/material";
import {Path} from "@/common/routing";
import {useState} from "react";
import {useNavigate} from "react-router";
import Button from "@mui/material/Button";
import {boxSx} from "@/common/styles/container.styles.ts";
import {buttonSearchSx, textFieledSx} from "@/features/movies/ui/Search/Search.style.ts";

export const SearchMenu = () => {

    const [searchQuery, setSearchQuery] = useState ("")
    const navigate = useNavigate ()

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch ()
        }
    }

    const handleSearch = () => {
        if (searchQuery.trim ()) {
            navigate (Path.Search)
            setSearchQuery ("")
        }
    }

    return (
        <Box sx={boxSx}>
            <TextField
                size="small"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery (e.target.value)}
                onKeyPress={handleKeyPress}
                sx={textFieledSx}
            />
            <Button
                variant="contained"
                onClick={handleSearch}
                sx={buttonSearchSx}
            >
                Search
            </Button>
        </Box>
    );
};

