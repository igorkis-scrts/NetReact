import { styled, Button } from "@mui/material";

export const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));
