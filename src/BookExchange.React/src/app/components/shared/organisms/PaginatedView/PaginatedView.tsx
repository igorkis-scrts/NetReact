import { Book, Post, Deal, Request, Common } from "@app/types";
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
  Skeleton,
  Card,
} from "@mui/material";
import { useStores } from "@stores/useStores";
import { ApiResponse } from "@utils/api/ApiResponse";
import { useState, useEffect, FC, ChangeEvent } from "react";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { BottomListControls, LoadingSkeletonContent, LoadingSkeletonTypography } from "./PaginatedView.styled";

interface IPaginatedViewProps<TData extends Book.Book | Post.Post | Deal.Deal | Request.Request> {
  title: string;
  listCard: FC<ICardProps<TData>>;
  squareCard: FC<ICardProps<TData>>;
  service: (...args: any) => Promise<ApiResponse<Common.PaginatedResult<TData>>>;
  cardAction?: (id: number) => void;
  cardActionText?: string;
}

type GenericData = Book.Book | Post.Post | Deal.Deal | Request.Request;

const PaginatedView = <TData extends GenericData>(props: IPaginatedViewProps<TData>) => {
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
    setPage(0);
  };

  useEffect(() => {
    fetchData(auth!.user?.id, rowsPerPage, page);
    //eslint-disable-next-line
  }, [page, rowsPerPage]);

  if (isDataLoading) {
    return (
      <>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <LoadingSkeletonTypography variant="h5">
              {props.title}
            </LoadingSkeletonTypography>
          </Grid>
        </Grid>

        <Card>
          <LoadingSkeletonContent>
            <Skeleton />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation={false} />
          </LoadingSkeletonContent>
        </Card>
      </>
    );
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
            count={data.totalPages > 0 ? data.totalPages : 1}
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
