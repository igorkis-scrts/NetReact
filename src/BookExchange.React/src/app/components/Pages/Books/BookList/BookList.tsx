import { BookApi } from "@api/Book.api";
import { useFetch } from "@hooks/useFetch";
import { Filter, ViewComfy, Add } from "@mui/icons-material";
import {
  SelectChangeEvent,
  Grid,
  Typography,
  IconButton,
  Box,
  Pagination,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { DialogContainer } from "@shared/atoms/ModalContainer/DialogContainer";
import { BookListCard } from "@shared/organisms/Cards/BookListCard/BookListCard";
import { BookSquareCard } from "@shared/organisms/Cards/BookSquareCard/BookSquareCard";
import { BookSkeletons } from "@shared/organisms/PaginatedView/BookSkeletons/BookSkeletons";
import { BottomListControls } from "@shared/organisms/PaginatedView/PaginatedView.styled";
import { countPages } from "@utils/countPages";
import Emitter from "@utils/Emitter";
import React, { useState, ChangeEvent, useEffect } from "react";
import AddBook from "../../AddBook";

interface IBookListProps {
  cardAction?: (id: number) => void;
  cardActionText?: string;
}

const BookList = (props: IBookListProps) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);
  const [isListView, setListView] = useState<boolean>(true);

  const { data, fetch: fetchData, isLoading: isDataLoading } = useFetch(BookApi.getAll);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleAddBookClick = () => {
    Emitter.emit("add-book", true);
  };

  useEffect(() => {
    fetchData({
      pageNumber: page,
      pageSize: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  if (isDataLoading) {
    return <BookSkeletons title="Books" />;
  }

  if (data == null) {
    return <p>No items were loaded</p>;
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Books</Typography>
        </Grid>

        <Grid item>
          <Button startIcon={<Add />} variant="contained" color="info" onClick={handleAddBookClick}>
            Add Book
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setListView(true);
            }}
          >
            <Filter />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setListView(false);
            }}
          >
            <ViewComfy />
          </IconButton>
        </Grid>
      </Grid>

      {isListView ? (
        data.data?.map((item) => (
          <Box my={3} key={item.id}>
            <BookListCard cardItem={item} action={props.cardAction} actionText={props.cardActionText} />
          </Box>
        ))
      ) : (
        <Grid container spacing={4}>
          {data.data?.map((item) => (
            <Grid item sm={3} key={item.id}>
              <BookSquareCard cardItem={item} action={props.cardAction} actionText={props.cardActionText} />
            </Grid>
          ))}
        </Grid>
      )}

      <BottomListControls container justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Pagination
            count={countPages(data.totalRecords, data.pageSize)}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
        <Grid item>
          <Select value={rowsPerPage?.toString()} label="Rows per Page" onChange={handleChangeRowsPerPage}>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </Grid>
      </BottomListControls>

      <DialogContainer dialogName="add-book" dialogTitle="Add New Book" disableBackdropClick>
        <AddBook closeDialog={() => Emitter.emit("add-book", false)}/>
      </DialogContainer>
    </>
  );
};

export { BookList };
