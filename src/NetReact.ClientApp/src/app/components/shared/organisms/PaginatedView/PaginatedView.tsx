import { Book, Post, PaginatedResult } from "@app/types";
import { useFetch } from "@hooks/useFetch";
import { ViewComfy, Filter } from "@mui/icons-material";
import {
  Grid,
  Typography,
  IconButton,
  Box,
  Pagination,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useStores } from "@stores/useStores";
import { ApiResponse } from "@utils/api/ApiResponse";
import { countPages } from "@utils/countPages";
import { useState, useEffect, FC, ChangeEvent } from "react";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { BookSkeletons } from "./BookSkeletons/BookSkeletons";
import { BottomListControls } from "./PaginatedView.styled";

interface IPaginatedViewProps<TData extends Book | Post> {
  title: string;
  listCard: FC<ICardProps<TData>>;
  squareCard: FC<ICardProps<TData>>;
  service: (...args: any) => Promise<ApiResponse<PaginatedResult<TData>>>;
  cardAction?: (id: number) => void;
  cardActionText?: string;
}

type GenericData = Book | Post;

const PaginatedView = function PaginatedView<TData extends GenericData>(props: IPaginatedViewProps<TData>) {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);
  const [isListView, setListView] = useState<boolean>(true);

  const { auth } = useStores();

  const { data, fetch: fetchData, isLoading: isDataLoading } = useFetch(props.service);

  const ListCard = props.listCard;
  const SquareCard = props.squareCard;

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    fetchData(auth!.user?.id, rowsPerPage, page);
    //eslint-disable-next-line
  }, [page, rowsPerPage]);

  if (isDataLoading) {
    return <BookSkeletons title={props.title} />;
  }

  if (data == null) {
    return <p>No items were loaded</p>;
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">{props.title}</Typography>
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
            <ListCard cardItem={item} action={props.cardAction} actionText={props.cardActionText} />
          </Box>
        ))
      ) : (
        <Grid container spacing={4}>
          {data.data?.map((item) => (
            <Grid item sm={3} key={item.id}>
              <SquareCard cardItem={item} action={props.cardAction} actionText={props.cardActionText} />
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
    </>
  );
};

export { PaginatedView };
