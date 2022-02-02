import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React from "react";

import { INavbarTab } from "./models/INavbarTab";
import { FixedAppBar } from "./Navbar.styled";
import { NavbarHomeLogo } from "./NavbarHomeLogo/NavbarHomeLogo";
import { appUrls } from "@app/appUrls";

import { NavbarLinkButton } from "./NavbarLinkButton/NavbarLinkButton";
import { Userbar } from "./Userbar/Userbar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

const authTabs: INavbarTab[] = [
  {
    id: 0,
    title: "Books",
    url: appUrls.books,
  },
  {
    id: 1,
    title: "Search",
    url: appUrls.searchBooks,
  },
];

const Navbar = observer(() => {
  const { auth } = useStores();

  return (
    <FixedAppBar position="static">
      <Toolbar>
        <Grid container direction="row" wrap="nowrap" justifyContent="space-between">
          <Grid container alignItems="center" wrap="nowrap">
            <NavbarHomeLogo />
            {auth!.isLoggedIn && authTabs.map((tab) => (
              <NavbarLinkButton key={tab.id} title={tab.title} url={tab.url} />
            ))}
          </Grid>

          <Grid container alignItems="center" justifyContent="end">
            <Userbar />
          </Grid>
        </Grid>
      </Toolbar>
    </FixedAppBar>
  );
});

export { Navbar };
