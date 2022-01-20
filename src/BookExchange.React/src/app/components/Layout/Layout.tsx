import { Grid, styled } from "@mui/material";
import React from "react";

import { Navbar } from "./Navbar/Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

const ContentContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  minHeight: "100%",
  minWidth: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
}));

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Navbar />
      <ContentContainer item>
        {children}
      </ContentContainer>
    </Grid>
  );
};

export { Layout };
