import { Grid } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { NavbarButton } from "../Navbar.styled";

interface INavbarTabButtonProps {
  title: string;
  url: string;
}

const NavbarLinkButton = (props: INavbarTabButtonProps) => {
  const { title, url } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = !!matchPath({ path: url, end: false }, location.pathname);

  const handleRedirect = () => {
    if (!isActive) {
      navigate(url);
    }
  };

  return (
    <Grid item>
      <NavbarButton isActive={isActive} color="inherit" onClick={handleRedirect}>
        {title}
      </NavbarButton>
    </Grid>
  );
};

export { NavbarLinkButton };
