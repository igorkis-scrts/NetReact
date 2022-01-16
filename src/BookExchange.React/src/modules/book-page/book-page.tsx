import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { useNavigate } from "react-router-dom";
import { UserService } from "services";

import Box from "@material-ui/core/Box";

import { useStyles } from "./book-page.styles";
import { BookService } from "../../services";
import { useParams } from "react-router";
import { PostsGrid } from "./components";
import { useFetch } from "hooks";
import { ImageUtils } from "utils";

const BookDetails = observer(() => {
  const classes = useStyles();
  const { auth } = useStores();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: book, fetch: fetchBook, isLoading } = useFetch(BookService.GetBookById);

  const { id: bookId } = useParams<{ id: string }>();

  useEffect(() => {
    if (isNaN(Number(bookId))) {
      return;
    }

    fetchBook(Number(bookId));
    //eslint-disable-next-line
  }, [bookId]);

  const handleAddToWishlist = async () => {
    if (!auth!.user) {
      enqueueSnackbar("Please sign in first", { variant: "error" });
      return;
    }

    try {
      var result = await UserService.AddBookToWishlist(auth!.user.id, Number(bookId));
      enqueueSnackbar("Book Added To WishList", { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleAddToBookshelf = async () => {
    if (!auth!.user || !book) {
      enqueueSnackbar("Please sign in first", { variant: "error" });
      return;
    }

    navigate("/posts/add/" + book.id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (book == null) {
    return <p>Invalid book id</p>;
  }

  console.log(ImageUtils.getAbsolutePath(`${book.thumbnailPath}`));
  return (
    <Container>
      <Paper className={classes.bookPaper}>
        <Grid container spacing={4}>
          <Grid item className={classes.bookInfo} md={9}>
            <Typography variant="h5" component="h1" className={classes.bookTitle}>
              {book.title}
            </Typography>
            {book.details?.publishedYear && (
              <Typography>
                <b>Published:</b> {book.details?.publishedYear}
              </Typography>
            )}

            {book.authors?.length !== 0 && (
              <Typography>
                <b>Authors:</b> {book.authors.map((a) => a.name).join(", ")}
              </Typography>
            )}

            <Typography>
              <b>ISBN:</b> {book?.isbn}
            </Typography>
            {book.details?.publisher && (
              <Typography>
                <b>Publisher:</b> {book.details.publisher}
              </Typography>
            )}

            <Typography>
              <b>Description:</b> {book.details?.description}
            </Typography>
            <Grid container>
              <Grid item>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToWishlist}
                    className={classes.rightButton}
                  >
                    Add To Wishlist
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Box mt={3}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleAddToBookshelf}
                    className={classes.rightButton}
                  >
                    Add To Bookshelf
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <img
              src={ImageUtils.getAbsolutePath(`${book.thumbnailPath}`)}
              alt=""
              className={classes.bookCover}
            />
          </Grid>

          <Grid item xs={12}>
            <PostsGrid bookId={Number(bookId)} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
});

export { BookDetails };
