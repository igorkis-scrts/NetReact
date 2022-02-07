import { styled, Button } from "@mui/material";

export const LinkButton = styled(Button)(() => ({
  textTransform: "none",
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "underline"
  }
}));