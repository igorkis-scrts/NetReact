import { Box, Typography } from "@material-ui/core";
import { useStores } from "@stores/useStores";
import { useFetch } from "hooks";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { UserService } from "services";
import { useStyles } from "./recommended-books.styles";
import { BookListCard } from "components/cards";

const RecommendedBooks = observer(() => {
  const classes = useStyles();
  const { auth } = useStores();

  const { data: books, fetch: fetchBook, isLoading } = useFetch(UserService.GetRecommendedBooks);

  useEffect(() => {
    if (!auth!.user) {
      return;
    }

    fetchBook(auth!.user.id);
  }, [ auth!.user, fetchBook]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (! auth!.user) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5">Books you may like</Typography>
      {books?.map((book, index) => (
        <Box my={4} key={index}>
          <BookListCard cardItem={book} />
        </Box>
      ))}
    </div>
  );
});

export { RecommendedBooks };
