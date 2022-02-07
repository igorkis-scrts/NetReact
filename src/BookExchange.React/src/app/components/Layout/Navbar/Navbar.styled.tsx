import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

export const NavbarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive"
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.secondary.main : ""
}));

export const FixedAppBar = styled(AppBar)(() => ({
  height: "64px"
}));