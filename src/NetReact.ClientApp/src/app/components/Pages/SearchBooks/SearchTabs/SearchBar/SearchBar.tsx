import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { MainSearchTextField } from "./SearchBar.styled";

interface ISearchBarProps {
  handleSearch: (searchTerm: string) => Promise<void>;
}

const SearchBar = (props: ISearchBarProps) => {
  const [ searchTerm, setSearchTerm ] = useState<string>("");

  return (
    <div>
      <MainSearchTextField
        fullWidth
        variant="outlined"
        label="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  props.handleSearch(searchTerm);
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export { SearchBar };