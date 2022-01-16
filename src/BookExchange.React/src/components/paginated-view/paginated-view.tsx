import { Box, Grid, IconButton, TablePagination, Typography } from "@material-ui/core";
import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useStyles } from "./paginated-view.styles";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ReorderIcon from "@material-ui/icons/Reorder";

import { Common, Book, Post, Request, Deal } from "types";
import { useFetch } from "hooks";
import { CardProps } from "components/cards";

interface PaginatedViewProps<TData extends Book.Book | Post.Post | Deal.Deal | Request.Request> {
  title: string;
  listCard: React.FC<CardProps<TData>>;
  squareCard: React.FC<CardProps<TData>>;
  service: (...args: any) => Promise<Common.PaginatedResult<TData>>;
  cardAction?: (id: number) => void;
  cardActionText?: string;
}

type GenericData = Book.Book | Post.Post | Deal.Deal | Request.Request;

const PaginatedView = observer(function RHFTaxpayerSelection<TData extends GenericData>(props: PaginatedViewProps<TData>) {
  const [ page, setPage ] = useState<number>(1);
  const [ rowsPerPage, setRowsPerPage ] = useState<number>(10);
  const [ isListView, setListView ] = useState<boolean>(true);

  const classes = useStyles();
  const { auth } = useStores();

  const { data, fetch: fetchData, isLoading: isDataLoading } = useFetch(props.service);

  const ListCard = props.listCard;
  const SquareCard = props.squareCard;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchData(auth!.user?.id, rowsPerPage, page);
    //eslint-disable-next-line
  }, [ page, rowsPerPage ]);

  if (isDataLoading) {
    return <div>Loading data...</div>;
  }

  if (data == null) {
    return <p>No items were loaded</p>;
  }

  return (
    <div>
      <Grid container justify="space-between">
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
            <ReorderIcon className={classes.filterIcon} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setListView(false);
            }}
            className={classes.filterIcon}
          >
            <ViewComfyIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container justify="flex-end" className={classes.filterIconsContainer} />

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
      <TablePagination
        count={data.totalRecords}
        page={page - 1}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[ 2, 3, 4 ]}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
});

export { PaginatedView };
