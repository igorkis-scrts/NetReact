import { AuthorApi } from "@api/Author.api";
import { BookApi } from "@api/Book.api";
import { CategoryApi } from "@api/Category.api";
import { CreateBook } from "@app/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { RhfAutocomplete } from "@shared/molecules/RhfAutocomplete/RhfAutocomplete";
import { FileInput } from "@shared/molecules/FileInput/FileInput";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { RootPaper, SubmitButton } from "./AddBook.styled";

const schema = yup.object().shape({
  title: yup.string().max(100).required("Title is required."),
  isbn: yup
    .string()
    .matches(/^\d+$/, "Only digits allowed.")
    .min(9)
    .max(13)
    .required("ISBN must contain 13 digits."),
  shortDescription: yup.string().required("Description is required."),
  authorIds: yup.array().of(yup.number().min(1)),
  categoryIds: yup.array().of(yup.number().min(1)),
});

interface IAddBookProps {
  closeDialog?: () => void;
}

const AddBook = ({ closeDialog }: IAddBookProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBook>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CreateBook) => {
    try {
      await BookApi.addBook(data);

      enqueueSnackbar("Book has been successfully created.", { variant: "success" });

      if (typeof closeDialog === "function") {
        closeDialog();
      }
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <Container sx={{ padding: "0 !important" }}>
      <RootPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register("title")}
                variant="outlined"
                label="Title"
                helperText={errors.title?.message}
                error={!!errors.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                {...register("isbn")}
                variant="outlined"
                label="ISBN"
                fullWidth
                helperText={errors.isbn?.message}
                error={!!errors.isbn}
              />
            </Grid>
            <Grid item xs={5}>
              <RhfAutocomplete
                control={control}
                name="authorIds"
                rules={{ required: true }}
                getOptions={AuthorApi.getAll}
                label="Authors"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("shortDescription")}
                variant="outlined"
                multiline
                label="Short Description"
                helperText={errors.shortDescription?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("description")}
                variant="outlined"
                multiline
                label="Description"
                helperText={errors.description?.message}
                error={!!errors.description}
                fullWidth
              />
            </Grid>

            <Grid item xs={3}>
              <RhfAutocomplete
                control={control}
                name="categoryIds"
                rules={{ required: true }}
                getOptions={CategoryApi.getAll}
                label="Categories"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                {...register("publisher")}
                variant="outlined"
                label="Publisher"
                helperText={errors.publisher?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                {...register("pageCount")}
                type="number"
                variant="outlined"
                label="Pages"
                helperText={errors.pageCount?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register("publishedYear")}
                type="number"
                variant="outlined"
                label="Publication Year"
                helperText={errors.pageCount?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput label="Cover" control={control} name="image" />
            </Grid>
            <SubmitButton variant="contained" color="primary" type="submit">
              Submit
            </SubmitButton>
          </Grid>
        </form>
      </RootPaper>
    </Container>
  );
};

export { AddBook };
