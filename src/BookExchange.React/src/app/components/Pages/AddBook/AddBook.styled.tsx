import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const RootPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
}));

export const PageTitleTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
}));