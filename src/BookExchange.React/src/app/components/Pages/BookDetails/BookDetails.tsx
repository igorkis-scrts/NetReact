import { BookApi } from "@api/Book.api";
import { useFetch } from "@hooks/useFetch";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ImageUtils } from "@utils/image.utils";

import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { BookPaper, BookTitleTypography, BookCoverImg } from "./BookDetails.styled";

const BookDetails = () => {
  const { data: book, fetch: fetchBook, isLoading } = useFetch(BookApi.getById);

  const { id: bookId } = useParams<{ id: string }>();

  useEffect(() => {
    if (isNaN(Number(bookId))) {
      return;
    }

    fetchBook(Number(bookId));
  }, [bookId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (book == null) {
    return <p>Invalid book id</p>;
  }

  return (
    <Container>
      <BookPaper>
        <Grid container spacing={4}>
          <Grid item md={9}>
            <BookTitleTypography variant="h5">{book.title}</BookTitleTypography>
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
          </Grid>
          <Grid item md={3}>
            <BookCoverImg src={ImageUtils.getAbsolutePath(`${book.thumbnailPath}`)} alt="" />
          </Grid>
        </Grid>
      </BookPaper>
    </Container>
  );
};

export { BookDetails };