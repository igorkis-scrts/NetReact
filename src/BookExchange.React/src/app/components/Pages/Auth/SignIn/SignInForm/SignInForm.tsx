import { Grid, TextField } from "@mui/material";
import { LinkButton } from "@shared/Styles/LinkButton";
import { useStores } from "@stores/useStores";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSnackbar } from "notistack";
import { appUrls } from "@app/appUrls";
import { Account } from "@app/types";
import { SubmitButton, Form } from "../../Auth.styled";

interface ISignInFormProps {
  closeDialog?: () => void;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("No password provided"),
});

const SignInForm = ({ closeDialog }: ISignInFormProps) => {
  const { auth } = useStores();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const from = (location.state as any)?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account.SignInData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Account.SignInData) => {
    try {
      await auth!.signIn(data.username, data.password);
      await auth!.fetchCurrentUser();

      navigate(from, { replace: true });
      if (typeof closeDialog === "function") {
        closeDialog();
      }
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const onSignUp = () => {
    navigate(appUrls.signUp);
    if (typeof closeDialog === "function") {
      closeDialog();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("username")}
            autoComplete="uname"
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("password")}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>
      </Grid>
      <SubmitButton type="submit" fullWidth variant="contained" color="primary">
        Sign In
      </SubmitButton>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <LinkButton disableRipple onClick={onSignUp}>
            Don&apos;t have an account? Sign up
          </LinkButton>
        </Grid>
      </Grid>
    </Form>
  );
};

export { SignInForm };
