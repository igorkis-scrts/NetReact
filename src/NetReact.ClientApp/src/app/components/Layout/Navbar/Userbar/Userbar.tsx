import { SignIn } from "@Pages/Auth/SignIn/SignIn";
import { SignUp } from "@Pages/Auth/SignUp/SignUp";
import { DialogContainer } from "@shared/atoms/ModalContainer/DialogContainer";
import { useStores } from "@stores/useStores";
import Emitter from "@utils/Emitter";
import { observer } from "mobx-react";
import React from "react";
import { appUrls } from "@app/appUrls";
import { useNavigate } from "react-router-dom";
import { NavbarButton } from "../Navbar.styled";
import { NavbarLinkButton } from "../NavbarLinkButton/NavbarLinkButton";
import { Grid } from "@mui/material";

const Userbar = observer(() => {
  const { auth } = useStores();
  const navigate = useNavigate();
  const { user, isLoggedIn } = auth!;

  const handleLogout = () => {
    auth!.signOut();
    navigate(appUrls.rootPath);
  };

  const handleLogin = () => {
    Emitter.publish("sign-in", true);
  };

  const handleRegister = () => {
    Emitter.publish("sign-up", true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <NavbarButton color="inherit" onClick={handleLogin}>
            Sign In
          </NavbarButton>
          <NavbarButton color="inherit" onClick={handleRegister}>
            Sign Up
          </NavbarButton>
        </>
      ) : (
        <>
          <NavbarLinkButton title={`${user?.username} profile`} url={appUrls.profile} />
          <Grid item>
            <NavbarButton color="inherit" onClick={handleLogout}>
              Sign Out
            </NavbarButton>
          </Grid>
        </>
      )}

      <DialogContainer dialogName="sign-in">
        <SignIn closeDialog={() => Emitter.publish("sign-in", false)} />
      </DialogContainer>

      <DialogContainer dialogName="sign-up">
        <SignUp closeDialog={() => Emitter.publish("sign-up", false)} />
      </DialogContainer>
    </>
  );
});

export { Userbar };
