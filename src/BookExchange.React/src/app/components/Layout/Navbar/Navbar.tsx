import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React from "react";

import { INavbarTab } from "./models/INavbarTab";
import { NavbarHomeLogo } from "./NavbarHomeLogo/NavbarHomeLogo";
import { appUrls } from "@app/appUrls";

import { NavbarLinkButton } from "./NavbarLinkButton/NavbarLinkButton";
import { Userbar } from "./Userbar/Userbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

const tabs: INavbarTab[] = [
  {
    id: 0,
    title: "Home",
    url: appUrls.rootPath,
  },
];

const authTabs: INavbarTab[] = [
  {
    id: 0,
    title: "Post Book",
    url: appUrls.postBook,
  },
  {
    id: 1,
    title: "Add Book",
    url: appUrls.addBook,
  },
  {
    id: 2,
    title: "Search Books",
    url: appUrls.searchBooks,
  },
  {
    id: 3,
    title: "Books",
    url: appUrls.books,
  },
];

const Navbar = observer(() => {
  const { auth } = useStores();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" wrap="nowrap" justifyContent="space-between">
          <Grid container alignItems="center" wrap="nowrap">
            <NavbarHomeLogo />
            {tabs.map((tab) => (
              <NavbarLinkButton key={tab.id} title={tab.title} url={tab.url} />
            ))}
            {auth!.isLoggedIn && authTabs.map((tab) => (
              <NavbarLinkButton key={tab.id} title={tab.title} url={tab.url} />
            ))}
          </Grid>

          <Grid container alignItems="center" justifyContent="end">
            <Userbar />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export { Navbar };
