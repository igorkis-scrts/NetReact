import { Grid, styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar/Navbar";

const ContentContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  minHeight: "100%",
  minWidth: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
}));

const Layout = () => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Navbar />
      <ContentContainer item>
        <Outlet/>
      </ContentContainer>
    </Grid>
  );
};

export { Layout };
