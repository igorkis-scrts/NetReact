import { Home } from "@mui/icons-material";
import { Typography, IconButton, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { appUrls } from "@app/appUrls";

const NavbarHomeLogo = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(appUrls.rootPath);
  };

  return (
    <Grid item>
      <IconButton edge="start" onClick={redirectToHome} color="inherit">
        <Home />
        <Typography variant="h6">.NET React</Typography>
      </IconButton>
    </Grid>
  );
};

export { NavbarHomeLogo };
