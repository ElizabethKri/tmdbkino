import {Box} from "@mui/material";
import {Path} from "@/common/routing";
import {useState} from "react";
import {useNavigate} from "react-router";
import Search from "@/common/components/Search/Search";

export const SearchMain = () => {

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

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Search value={searchQuery}
                    onChangeHandler={(e) => setSearchQuery (e.target.value)}
                    onKeyPress={handleKeyPress} handleSearch={handleSearch}
            />
        </Box>
    );
};

