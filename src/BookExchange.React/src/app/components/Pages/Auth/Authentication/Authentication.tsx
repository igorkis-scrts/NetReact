import { Lock } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import { ReactNode } from "react";
import { MainPaper, ProfileAvatar } from "./Authentication.styled";

interface IAuthenticationProps {
  isSignIn: boolean;
  children: ReactNode;
}

const Authentication = (props: IAuthenticationProps) => {
  return (
    <Container sx={{ padding: "0 !important" }} maxWidth="xs">
      <MainPaper>
        <ProfileAvatar>
          <Lock />
        </ProfileAvatar>
        <Typography variant="h5">
          {props.isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        {props.children}
      </MainPaper>
    </Container>
  );
};

export { Authentication };
