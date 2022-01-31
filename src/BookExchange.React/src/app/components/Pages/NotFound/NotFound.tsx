import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { LinkButton } from "@shared/Styles/LinkButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { appUrls } from "../../../appUrls";
import { SadIcon, RootGrid } from "./NotFound.styled";

const NotFound = () => {
  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(appUrls.rootPath);
  };

  return (
    <RootGrid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Grid item xs="auto">
        <SadIcon color="secondary" />
      </Grid>

      <Grid item>
        <Typography>
          Oops! Looks like that the page you&apos;re looking for does not exists.
        </Typography>
      </Grid>
      <Grid item>
        <LinkButton disableRipple onClick={onRedirect}>
          Redirect to Home
        </LinkButton>
      </Grid>
    </RootGrid>
  );
};

export { NotFound };
