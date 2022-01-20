import { styled, Button } from "@mui/material";

export const NavbarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive"
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.secondary.main : ""
}));