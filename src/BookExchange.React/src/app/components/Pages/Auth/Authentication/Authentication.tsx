import { Lock } from "@mui/icons-material";
import { Container, Paper, Avatar, styled, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IAuthenticationProps {
  isSignIn: boolean;
  children: ReactNode;
}

const MainPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const Authentication = (props: IAuthenticationProps) => {
  return (
    <Container component="div" maxWidth="xs">
      <MainPaper>
        <ProfileAvatar>
          <Lock />
        </ProfileAvatar>
        <Typography component="h1" variant="h5">
          {props.isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        {props.children}
      </MainPaper>
    </Container>
  );
};

export { Authentication };