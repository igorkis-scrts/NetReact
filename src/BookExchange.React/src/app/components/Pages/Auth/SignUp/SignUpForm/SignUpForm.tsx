import { Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LinkButton } from "@shared/Styles/LinkButton";
import { useStores } from "@stores/useStores";
import React from "react";
import { useSnackbar } from "notistack";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Account } from "../../../../../types";
import { appUrls } from "@app/appUrls";
import { SubmitButton, Form } from "../../Auth.styled";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username should contain at least 4 characters"),
  email: yup.string().required("Email Address is required"),
  password: yup
    .string()
    .required("No password provided")
    .min(8, "Password should contain at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = () => {
  const { auth } = useStores();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account.SignUpData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Account.SignUpData) => {
    try {
      await auth!.signUp(data);
      await auth!.fetchCurrentUser();

      navigate("/profile");
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const onSignUp = () => {
    navigate(appUrls.signIn);
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
            {...register("email")}
            variant="outlined"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={errors.email?.message}
            error={!!errors.email}
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
        <Grid item xs={12}>
          <TextField
            {...register("confirmPassword")}
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="confirmPassword"
            id="confirmPassword"
            autoComplete="confirm-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="Subscribe to notifications"
          />
        </Grid>
      </Grid>
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
      >
        Sign Up
      </SubmitButton>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <LinkButton disableRipple onClick={onSignUp}>
            Already have an account? Sign in
          </LinkButton>
        </Grid>
      </Grid>
    </Form>
  );
};

export { SignUpForm };