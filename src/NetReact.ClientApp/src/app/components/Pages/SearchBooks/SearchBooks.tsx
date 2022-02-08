import { ViewComfy } from "@mui/icons-material";
import { Grid, IconButton, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { BookListCard } from "@shared/organisms/Cards/BookListCard/BookListCard";
import { BookSquareCard } from "@shared/organisms/Cards/BookSquareCard/BookSquareCard";
import { BottomListControls } from "@shared/organisms/PaginatedView/PaginatedView.styled";
import { countPages } from "@utils/countPages";
import React, { ChangeEvent, useState } from "react";
import { Book } from "../../../types";
import { FilterIconsGrid, ReorderIcon, ViewComfyIconButton } from "./SearchBooks.styled";
import { SearchTabs } from "./SearchTabs/SearchTabs";


const SearchBooks = () => {
  const [ isListView, setListView ] = useState<boolean>(true);
  const [ isActiveSmartSearch, setActiveSmartSearch ] = useState<boolean>(true);

  const [ page, setPage ] = useState(1);
  const [ books, setBooks ] = useState<Book[]>();
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ totalRecords, setTotalRecords ] = useState(10);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };


  if (page <= 0) {
    setPage(1);
  }

  return (
    <Container>
      <SearchTabs
        setTotalRecords={setTotalRecords}
        page={page}
        rowsPerPage={rowsPerPage}
        setBooks={setBooks}
        isActiveSmartSearch={isActiveSmartSearch}
        setActiveSmartSearch={setActiveSmartSearch}
      />
      <FilterIconsGrid container justifyContent="flex-end">
        <IconButton
          aria-label="delete"
          onClick={() => {
            setListView(true);
          }}
        >
          <ReorderIcon />
        </IconButton>
        <ViewComfyIconButton
          aria-label="delete"
          onClick={() => {
            setListView(false);
          }}
        >
          <ViewComfy />
        </ViewComfyIconButton>
      </FilterIconsGrid>
      {isListView ? (
        books?.map((book) => (
          <Box my={3} key={book.id}>
            <BookListCard cardItem={book} />
          </Box>
        ))
      ) : (
        <Grid container spacing={4}>
          {books?.map((book) => (
            <Grid item sm={3} key={book.id}>
              <BookSquareCard cardItem={book} />
            </Grid>
          ))}
        </Grid>
      )}

      <BottomListControls container justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Pagination
            count={countPages(totalRecords, rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
        <Grid item>
          <Select value={rowsPerPage?.toString()} label="Rows per Page" onChange={handleChangeRowsPerPage}>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </Grid>
      </BottomListControls>
    </Container>
  );
};

export { SearchBooks };