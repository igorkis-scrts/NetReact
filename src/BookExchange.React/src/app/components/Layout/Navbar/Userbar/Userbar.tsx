import { SignIn } from "@Pages/Auth/SignIn/SignIn";
import { SignUp } from "@Pages/Auth/SignUp/SignUp";
import { DialogContainer } from "@shared/atoms/ModalContainer/DialogContainer";
import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { appUrls } from "@app/appUrls";
import { useNavigate } from "react-router-dom";
import { NavbarButton } from "../Navbar.styled";
import { NavbarLinkButton } from "../NavbarLinkButton/NavbarLinkButton";
import { Grid } from "@mui/material";

const Userbar = observer(() => {
  const [isSignInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  const { auth } = useStores();
  const navigate = useNavigate();
  const { user, isLoggedIn } = auth!;

  const handleLogout = () => {
    auth!.signOut();
    navigate(appUrls.rootPath);
  };

  const handleLogin = () => {
    setSignInModalOpen(true);
  };

  const handleRegister = () => {
    setIsSignUpModalOpen(true);
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

      <DialogContainer isOpen={isSignInModalOpen} toggle={() => setSignInModalOpen(!isSignInModalOpen)}>
        <SignIn closeDialog={() => setSignInModalOpen(false)} />
      </DialogContainer>

      <DialogContainer isOpen={isSignUpModalOpen} toggle={() => setIsSignUpModalOpen(!isSignUpModalOpen)}>
        <SignUp closeDialog={() => setSignInModalOpen(false)} />
      </DialogContainer>
    </>
  );
});

export { Userbar };
