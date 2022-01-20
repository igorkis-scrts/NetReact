import { AppBar, Toolbar, Grid } from "@mui/material";
import React from "react";

import { INavbarTab } from "./models/INavbarTab";
import { NavbarHomeLogo } from "./NavbarHomeLogo/NavbarHomeLogo";
import { appUrls } from "@app/appUrls";

import { NavbarLinkButton } from "./NavbarLinkButton/NavbarLinkButton";
import { Userbar } from "./Userbar/Userbar";

const tabs: INavbarTab[] = [
  {
    id: 0,
    title: "Home",
    url: appUrls.rootPath,
  }
];

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" wrap="nowrap" justifyContent="space-between">
          <Grid container alignItems="center">
            <NavbarHomeLogo />
            {tabs.map((tab) => (
              <NavbarLinkButton key={tab.id} title={tab.title} url={tab.url} />
            ))}
          </Grid>

          <Grid container alignItems="center" justifyContent="end">
            <Userbar/>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
