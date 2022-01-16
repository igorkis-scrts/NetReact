import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Post } from "types";
import { PostService } from "services";
import { useStyles } from "./post-form.styles";
import { useFetch } from "hooks";
import { useSnackbar } from "notistack";
import { Autocomplete } from "@material-ui/lab";

interface PostFormParams {
  bookId: number;
}

const PostForm = observer(({ bookId }: PostFormParams) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useStores();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
  } = useForm<Post.CreatePost>();

  const {
    data: conditions,
    fetch: fetchConditions,
    isLoading,
  } = useFetch(PostService.GetBookConditions);

  useEffect(() => {
    fetchConditions();
  }, []);

  const onSubmit = async (data: Post.CreatePost) => {
    console.log("on submit post", data);
    if (!auth!.user) return;

    data.bookId = bookId;
    data.postedById = auth!.user?.id;

    try {
      await PostService.CreatePost(data);
      enqueueSnackbar("Book added to bookshelf", { variant: "success" });
      navigate("/profile");
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  if (isLoading || !conditions) {
    return <p>Loading...</p>;
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="condition"
        control={control}
        render={({ field: { onChange }, ...props }) => (
          <Autocomplete
            {...props}
            id="condition"
            options={conditions}
            // getOptionLabel={(option: Condition.Condition) => option.label}
            // renderOption={(option) => option.label}
            onChange={(e, data) => onChange(data)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Condition" />
            )}
          />
        )}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>{" "}
    </form>
  );
});

export { PostForm };
