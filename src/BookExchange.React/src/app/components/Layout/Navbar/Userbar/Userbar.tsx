import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React from "react";
import { appUrls } from "@app/appUrls";
import { NavbarButton } from "../Navbar.styled";
import { NavbarLinkButton } from "../NavbarLinkButton/NavbarLinkButton";
import { Grid } from "@mui/material";

const Userbar = observer(() => {
  const { auth } = useStores();
  const { user, isLoggedIn } = auth!;

  const handleOnClick = () => {
    auth!.signOut();
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <NavbarLinkButton title="Sign In" url={appUrls.signIn} />
          <NavbarLinkButton title="Sign Up" url={appUrls.signUp} />
        </>
      ) : (
        <>
          <NavbarLinkButton title={`Hello, ${user?.username}!`} url={appUrls.profile} />
          <Grid item>
            <NavbarButton color="inherit" onClick={handleOnClick}>
              Sign Out
            </NavbarButton>
          </Grid>
        </>
      )}
    </>
  );
});

export { Userbar };
